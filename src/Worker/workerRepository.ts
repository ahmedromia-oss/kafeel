import { GenericRepository } from 'shared/generic.repository';
import { education } from 'src/constants';

import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, EntityManager, Repository } from 'typeorm';
import { Worker } from './worker.model';

export class WorkerRepository extends GenericRepository<Worker> {
  constructor(
    @InjectRepository(Worker)
    repository: Repository<Worker>,
  ) {
    super(repository);
  }

  
}
