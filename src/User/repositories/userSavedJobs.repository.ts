import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericRepository } from 'shared/generic.repository';

import { Repository } from 'typeorm';
import { UserSavedAdvertise } from '../models/userAdvertiseSaved.model';

@Injectable()
export class UserSavedAdvertiseRepository extends GenericRepository<UserSavedAdvertise> {
  constructor(
    @InjectRepository(UserSavedAdvertise)
    repository: Repository<UserSavedAdvertise>,
  ) {
    super(repository);
  }
}
