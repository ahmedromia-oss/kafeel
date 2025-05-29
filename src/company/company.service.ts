import { Injectable } from '@nestjs/common';

import { EntityManager } from 'typeorm';
import { companyRepository } from './company.repository';
import { Company } from './company.model';

@Injectable()
export class companyService {
  constructor(private companyRepo: companyRepository) {}
  async create(userId: string, manager?: EntityManager) {
    return await this.companyRepo.create({ userId: userId }, manager);
  }
  async getCompany(companyId: string): Promise<Company> {
    return await this.companyRepo.findOne({ where: { userId: companyId } });
  }
  async getProfile(userId: string) {
    return await this.companyRepo.findOne({ where: { userId: userId } });
  }
}
