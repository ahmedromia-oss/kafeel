import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GenericRepository } from 'shared/generic.repository';
import { Otp } from './otp.model';


@Injectable()
export class OtpRepository extends GenericRepository<Otp> {
  constructor(
    @InjectRepository(Otp)
    repository: Repository<Otp>,
  ) {
    super(repository);
  }
}
