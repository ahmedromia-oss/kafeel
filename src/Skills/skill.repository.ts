import { GenericRepository } from 'shared/generic.repository';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './skills.model';

export class skillRepository extends GenericRepository<Skill> {
  constructor(
    @InjectRepository(Skill)
    repository: Repository<Skill>,
  ) {
    super(repository);
  }

  
}
