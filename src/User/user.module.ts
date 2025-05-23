import { Module } from '@nestjs/common';

import { UserService } from './user.service';

import { UserController } from './user.controller';

import { SharedModule } from 'src/UnitOfWork/unitOfWork.module';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.model';
import { UserFactoryService } from './user.factory';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([User]) ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService, UserRepository , UserFactoryService],
})
export class UserModule {}
