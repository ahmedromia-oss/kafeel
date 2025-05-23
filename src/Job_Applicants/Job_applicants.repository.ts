import { GenericRepository } from 'shared/generic.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobApplicants } from './Job_applicants.model';

export class JobApplicantsRepository extends GenericRepository<JobApplicants> {
  constructor(
    @InjectRepository(JobApplicants)
    private readonly jobApplicantsRepository: Repository<JobApplicants>,
  ) {
    super(jobApplicantsRepository);
  }

  // Add custom methods specific to JobApplicants entity here
}
