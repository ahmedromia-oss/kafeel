import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';

import { getUserDto } from './DTOs/getUserDto';
import { UnitOfWork } from 'src/UnitOfWork/unitOfWork.service';
import { UserFactoryService } from './user.factory';
import { UserRepository } from './repositories/user.repository';
import { EntityManager } from 'typeorm';
import { UserType } from 'src/constants';

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
  public async getUsersBasedType(type:UserType){
    const service = this.userFactory.getService(type);
    const result =  await service.getAll()
    return result
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
    const service = this.userFactory.getService(user.userType);
    return await service.getProfile(user.id);
  }
  public async getProfileLocked(userId: string) {
    const user = await this.UserRepository.findOne({
      where: { id: userId },
    });
    const service = this.userFactory.getService(user.userType);
    return await service.getPrivateProfile(user.id);
  }

  public async unApproveUser(userId: string) {
    return await this.UpdateUser({ userApproved: false } as User, userId);
  }
  public async deleteUser(userId: string) {
    return await this.UserRepository.delete({ id: userId });
  }
}
