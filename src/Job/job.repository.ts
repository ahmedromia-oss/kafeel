import { GenericRepository } from 'shared/generic.repository';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './models/job.model';

export class JobRepository extends GenericRepository<Job> {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {
    super(jobRepository);
  }

  // Add custom methods specific to Job entity here
}
