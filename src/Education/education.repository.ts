import { GenericRepository } from 'shared/generic.repository';
import { education } from 'src/constants';
import { Education } from './education.model';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, EntityManager, Repository } from 'typeorm';

export class educationRepository extends GenericRepository<Education> {
  constructor(
    @InjectRepository(Education)
    repository: Repository<Education>,
  ) {
    super(repository);
  }
}
