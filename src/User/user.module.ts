import { Module } from '@nestjs/common';

import { UserService } from './user.service';

import { UserController } from './user.controller';

import { SharedModule } from 'src/UnitOfWork/unitOfWork.module';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.model';
import { UserFactoryService } from './user.factory';
import { BucketsModule } from 'src/Buckets/buckets.module';
import { TokenModule } from 'src/JWT/jwt.module';
import { KafeelModule } from 'src/Kafeel/kafeel.module';
import { companyModule } from 'src/company/company.module';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([User]) , BucketsModule , TokenModule , KafeelModule , companyModule ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService, UserRepository , UserFactoryService],
})
export class UserModule {}
