import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';

import { getUserDto } from './DTOs/getUserDto';
import { UnitOfWork } from 'src/UnitOfWork/unitOfWork.service';
import { UserFactoryService } from './user.factory';
import { UserRepository } from './repositories/user.repository';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private UserRepository: UserRepository,
    private userFactory: UserFactoryService,
    private uow: UnitOfWork,
  ) {}
  public async getByPhoneNumber(phoneNumber: string) {
    return await this.UserRepository.findOne({
      where: { phoneNumber: phoneNumber },
    });
  }
  public async createUser(data: User, manager?: EntityManager): Promise<User> {
    if (manager) {
      const user = await this.UserRepository.create(data, manager);
      const service = this.userFactory.getService(data.userType);
      await service.create(user.id, manager);
      return user;
    }
    return await this.uow.execute(async (manager: EntityManager) => {
      const user = await this.UserRepository.create(data, manager);
      const service = this.userFactory.getService(data.userType);
      await service.create(user.id, manager);
      return user;
    });
  }

  public async IsEmailUnique(email: string) {
    if (email) {
      return !(await this.UserRepository.checkIFExists({
        where: { email: email },
      }));
    }
    return true;
  }
  public async IsPhoneUnique(phone: string) {
    if (phone) {
      return !(await this.UserRepository.checkIFExists({
        where: { phoneNumber: phone },
      }));
    }
    return true;
  }

  public async getUserByEmail(email: string): Promise<User> {
    return await this.UserRepository.findOne({ where: { email: email } });
  }
  public async getUsers(): Promise<getUserDto[]> {
    return await this.UserRepository.findAll({
      select: Object.keys(new getUserDto()) as (keyof User)[],
    });
  }
  public async getUserById(id: string): Promise<User> {
    return await this.UserRepository.findById(id);
  }
  public async allUsers(): Promise<User[]> {
    return await this.UserRepository.findAll({
      select: Object.keys(new getUserDto()) as (keyof User)[],
    });
  }
  public async UpdateUser(updateUser: User, userId: string): Promise<string> {
    return await this.UserRepository.update({ id: userId }, updateUser);
  }
  public async getProfile(userId: string) {
    const user = await this.getUserById(userId);
    const service =this.userFactory.getService(user.userType);
    const res =  await service.getProfile(user.id);
    console.log(res)
    return res
  }
  public async unApproveUser(userId: string) {
    return await this.UpdateUser({ userApproved: false } as User, userId);
  }
}
