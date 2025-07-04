import { GenericRepository } from 'shared/generic.repository';

import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Job } from './models/job.model';
import { JobType } from 'src/constants';
import { title } from 'process';

export class JobRepository extends GenericRepository<Job> {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {
    super(jobRepository);
  }
  async takeTop5(companyId: string) {
    return await this.jobRepository.query(
      `select jo.title as title , count(apps.id) as applicants from company
join job jo
on jo.companyId =  '${companyId}'
join job_applicants apps
on apps.jobId = jo.id

group by title
order by count(apps.id)
limit 5
`,
    );
  }
  async searchJobs(
    companyId?: string,
    searchTerm?: string,
    category?: string,
    jobType?: string,
    country?: string,
    skip?: number,
    take?: number,
  ) {
    const cat = `%${(category ?? '').trim().toLowerCase()}%`;
    const searchPattern = `%${searchTerm ?? ''}%`;
    const types = jobType ? [jobType] : Object.values(JobType);
    const rawCity = (country ?? '').trim().toLowerCase();
    const cityPattern = `%${rawCity}%`;
    const IdPattern = `%${companyId ? companyId : ''}%`;
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

    // OR Description + city match block
    qb.where("LOWER(COALESCE(job.description , '')) LIKE :cat", {
      cat,
    })
      .andWhere('LOWER(job.title) LIKE :searchPattern', { searchPattern })

      .andWhere('job.jobType IN (:...types)', { types })
      .andWhere("LOWER(COALESCE(company.city, '')) LIKE :cityPattern", {
        cityPattern,
      })
      .andWhere('job.companyId LIKE :companyId', { companyId: IdPattern });

    return await qb.getMany();

    // Execute both count and data in one go
  }
}
