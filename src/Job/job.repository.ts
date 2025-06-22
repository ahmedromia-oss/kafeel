import { GenericRepository } from 'shared/generic.repository';

import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Job } from './models/job.model';
import { JobType } from 'src/constants';

export class JobRepository extends GenericRepository<Job> {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {
    super(jobRepository);
  }
  async searchJobs(
    searchTerm?: string,
    category?: string,
    jobType?: string,
    country?: string,
    skip?: number,
    take?: number,
  ) {
    const rawSearch = (searchTerm ?? category ?? '').trim().toLowerCase();
    const searchPattern = `%${rawSearch}%`;
    const types = jobType ? [jobType] : Object.values(JobType);
    const rawCity = (country ?? '').trim().toLowerCase();
    const cityPattern = `%${rawCity}%`;

    const qb = this.repository
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.savedByUsers', 'savedByUsers')
      
      .leftJoinAndSelect('job.company', 'company')
      .leftJoinAndSelect('company.Jobs', 'Jobs')
      .leftJoinAndSelect('job.applicants', 'applicants')
      .leftJoinAndSelect('company.user', 'user')


      // Pagination
      .skip(skip)
      .take(take)
      // Ordering
      .orderBy('job.createdAt', 'DESC');

    // Title match block
    qb.where(
      new Brackets((b) =>
        b
          .where('LOWER(job.title) LIKE :searchPattern', { searchPattern })
          .andWhere('job.jobType IN (:...types)', { types }),
      ),
    );

    // OR Description + city match block
    qb.orWhere(
      new Brackets((b) =>
        b
          .where('LOWER(job.description) LIKE :searchPattern', {
            searchPattern,
          })
          .andWhere('job.jobType IN (:...types)', { types })
          .andWhere("LOWER(COALESCE(company.city, '')) LIKE :cityPattern", {
            cityPattern,
          }),
      ),
    );
    return await qb.getMany();

    // Execute both count and data in one go
  }
}
