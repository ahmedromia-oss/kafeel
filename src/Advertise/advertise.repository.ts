// src/transfer-announcement/advertise.repository.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';

import { GenericRepository } from 'shared/generic.repository';
import { Advertise } from './advertise.model';
import { JobType } from 'src/constants';

@Injectable()
export class AdvertiseRepository extends GenericRepository<Advertise> {
  constructor(
    @InjectRepository(Advertise)
    repository: Repository<Advertise>,
  ) {
    super(repository);
  }
  async searchAdvertise(
    searchTerm?: string,
    jobType?: string,
    category?: string,
    country?: string,
    skip?: number,
    take?: number,
    companyId?: string,
  ) {
    const cat = `%${(category ?? '').trim().toLowerCase()}%`;
    const searchPattern = `%${searchTerm??''}%`;
    const types = jobType ? [jobType] : (Object.values(JobType) as JobType[]);
    const rawCity = (country ?? '').trim().toLowerCase();
    const cityPattern = `%${rawCity}%`;
    const IdPattern = `%${companyId ?? ''}%`;
    const qb = this.repository
      .createQueryBuilder('ad')
      .leftJoinAndSelect('ad.worker', 'worker')
      .leftJoinAndSelect('ad.savedByUsers', 'savedByUsers')

      .leftJoinAndSelect('ad.company', 'company')
      .leftJoinAndSelect('company.user', 'companyUser')
      .leftJoinAndSelect('worker.user', 'workerUser')

      .skip(skip)
      .take(take)
      .orderBy('ad.createdAt', 'DESC');

    // First filter block: jobTitle + workType + city
    qb.where("LOWER(COALESCE(ad.jobTitle , '')) LIKE :searchPattern", { searchPattern })

      .andWhere('LOWER(COALESCE(ad.description , "")) LIKE :cat', { cat })
      .andWhere('ad.workType IN (:...types)', { types })
      .andWhere("LOWER(COALESCE(ad.currentCity, '')) LIKE :cityPattern", {
        cityPattern,
      })
      .andWhere('ad.companyId LIKE :companyId', { companyId: IdPattern });

    return await qb.getMany();
  }
}
