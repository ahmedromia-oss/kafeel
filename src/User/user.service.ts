import { Injectable } from '@nestjs/common';
import { User } from './user.model';

import { getUserDto } from './DTOs/getUserDto';
import { UnitOfWork } from 'src/UnitOfWork/unitOfWork.service';
import { UserRepository } from './user.repository';
import { UserFactoryService } from './user.factory';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private UserRepository: UserRepository,
    private userFactory: UserFactoryService,
    private uow: UnitOfWork,
  ) {}

  public async createUser(data: User): Promise<User> {
    return this.uow.execute(async (manager: EntityManager) => {
      const user = await this.UserRepository.create(data , manager);
      const service = this.userFactory.getService(data.userType);
      await service.create(user.id , manager);
      return user;
      
    });
  }
  public async IsEmailUnique(email: string) {
    return !(await this.UserRepository.checkIFExists({
      where: { email: email },
    }));
  }

  public async getUserByEmail(email: string): Promise<User> {
    return await this.UserRepository.findOne({ where: { email: email } });
  }
  public async getUsers(): Promise<getUserDto[]> {
    return await this.UserRepository.findAll({
      select: Object.keys(new getUserDto()) as (keyof User)[],
    });
  }
  public async getUserById(id: string): Promise<getUserDto> {
    return await this.UserRepository.findById(id, {
      select: Object.keys(new getUserDto()) as (keyof User)[],
    });
  }
  public async allUsers(): Promise<User[]> {
    return await this.UserRepository.findAll({
      select: Object.keys(new getUserDto()) as (keyof User)[],
    });
  }
  public async UpdateUser(updateUser: User, userId: string): Promise<string> {
   
    return await this.UserRepository.update({ id: userId }, updateUser);
  }
}
