import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GenericRepository } from 'shared/generic.repository';
import { kafeel } from './kafeel.model';

@Injectable()
export class KafeelRepository extends GenericRepository<kafeel> {
  constructor(
    @InjectRepository(kafeel)
    repository: Repository<kafeel>,
  ) {
    super(repository);
  }
}
