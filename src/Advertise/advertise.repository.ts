// src/transfer-announcement/advertise.repository.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GenericRepository } from 'shared/generic.repository';
import { Advertise } from './advertise.model';


@Injectable()
export class AdvertiseRepository extends GenericRepository<Advertise> {
  constructor(
    @InjectRepository(Advertise)
    repository: Repository<Advertise>,
  ) {
    super(repository);
  }
}
