import { GenericRepository } from 'shared/generic.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Constants } from './constants.model';

export class ConstantsRepository extends GenericRepository<Constants> {
  constructor(
    @InjectRepository(Constants)
    repository: Repository<Constants>,
  ) {
    super(repository);
  }
}

