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
    const rawSearch = (searchTerm ?? category ?? '').trim().toLowerCase();
    const searchPattern = `%${rawSearch}%`;
    const types = jobType ? [jobType] : (Object.values(JobType) as JobType[]);
    const rawCity = (country ?? '').trim().toLowerCase();
    const cityPattern = `%${rawCity}%`;
    const IdPattern = `%${companyId?companyId:''}%`;

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
    qb.where(
      new Brackets((b) =>
        b
          .where('LOWER(ad.jobTitle) LIKE :searchPattern', { searchPattern })
          .andWhere('ad.workType IN (:...types)', { types })
          .andWhere("LOWER(COALESCE(ad.currentCity, '')) LIKE :cityPattern", {
            cityPattern,
          }),
      ),
    );

    // OR second filter block: description + workType + city
    qb.orWhere(
      new Brackets((b) =>
        b
          .where('LOWER(ad.description) LIKE :searchPattern', { searchPattern })
          .andWhere('ad.workType IN (:...types)', { types })
          .andWhere("LOWER(COALESCE(ad.currentCity, '')) LIKE :cityPattern", {
            cityPattern,
          }),
      ),
    );
    console.log(IdPattern)
    qb.where('ad.companyId LIKE :companyId', { companyId: IdPattern });

    return await qb.getMany();
  }
}
