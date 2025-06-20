import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { EntityManager } from 'typeorm';
import { companyRepository } from './company.repository';
import { Company } from './company.model';
import { UserService } from 'src/User/user.service';
import { User } from 'src/User/models/user.model';

@Injectable()
export class companyService {
  constructor(
    private companyRepo: companyRepository,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}
  async create(userId: string, manager?: EntityManager) {
    return await this.companyRepo.create({ userId: userId }, manager);
  }
  async getCompany(companyId: string): Promise<Company> {
    return await this.companyRepo.findOne({ where: { userId: companyId } });
  }
  async getProfile(userId: string) {
    return await this.companyRepo.findOne({ where: { userId: userId } });
  }
  async updateCompany(companyId: string, company: Company) {
    return await this.companyRepo.update({ userId: companyId }, company);
  }
  async approveCompany(companyId: string) {
    const company = await this.companyRepo.findOne({
      where: { userId: companyId },
      relations: { user: true },
    });
    return await this.userService.UpdateUser(
      { ...company.user, userApproved: true } as User,
      companyId,
    );
  }
  async unApprovedUsers() {
    return await this.companyRepo.findAll({
      where: { user: { userApproved: false } },
    });
  }
}
