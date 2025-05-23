import { GenericRepository } from 'shared/generic.repository';

import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { Language } from './languages.model';

export class languageRepository extends GenericRepository<Language> {
  constructor(
    @InjectRepository(Language)
    repository: Repository<Language>,
  ) {
    super(repository);
  }

  
}
