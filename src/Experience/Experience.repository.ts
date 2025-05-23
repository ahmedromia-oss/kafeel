import { GenericRepository } from 'shared/generic.repository';
import { education } from 'src/constants';

import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, EntityManager, Repository } from 'typeorm';
import { Experience } from './Experience.model';

export class experienceRepository extends GenericRepository<Experience> {
  constructor(
    @InjectRepository(Experience)
    repository: Repository<Experience>,
  ) {
    super(repository);
  }

  
}
