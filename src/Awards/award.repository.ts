import { GenericRepository } from 'shared/generic.repository';
import { education } from 'src/constants';

import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, EntityManager, Repository } from 'typeorm';
import { Award } from './awards.model';


export class AwardRepository extends GenericRepository<Award> {
  constructor(
    @InjectRepository(Award)
    repository: Repository<Award>,
  ) {
    super(repository);
  }

  
}
