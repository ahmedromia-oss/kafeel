import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericRepository } from 'shared/generic.repository';


import { Repository } from 'typeorm';
import { UserSavedJob } from '../models/userJobSaved.model';
import { User } from '../models/user.model';

@Injectable()
export class UserSavedJobRepository extends GenericRepository<UserSavedJob> {
  constructor(
    @InjectRepository(UserSavedJob)
    repository: Repository<UserSavedJob>,
  ) {
    super(repository);
  }
}
