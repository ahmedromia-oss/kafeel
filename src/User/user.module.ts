import { forwardRef, Module } from '@nestjs/common';

import { UserService } from './user.service';

import { UserController } from './user.controller';

import { SharedModule } from 'src/UnitOfWork/unitOfWork.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.model';
import { UserFactoryService } from './user.factory';
import { BucketsModule } from 'src/Buckets/buckets.module';
import { TokenModule } from 'src/JWT/jwt.module';
import { KafeelModule } from 'src/Kafeel/kafeel.module';
import { companyModule } from 'src/company/company.module';
import { workerModule } from 'src/Worker/worker.module';
import { UserRepository } from './repositories/user.repository';
import { UserSavedAdvertiseRepository } from './repositories/userSavedJobs.repository';
import { UserSavedJobRepository } from './repositories/userSavedAdvertise.repository';
import { UserSavedAdvertise } from './models/userAdvertiseSaved';
import { UserSavedJob } from './models/userJobSaved';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([User , UserSavedAdvertise , UserSavedJob]) , BucketsModule , TokenModule , KafeelModule , forwardRef(() => companyModule), workerModule],
  exports: [UserService , UserSavedAdvertiseRepository , UserSavedJobRepository],
  controllers: [UserController],
  providers: [UserService, UserRepository , UserFactoryService , UserSavedAdvertiseRepository , UserSavedJobRepository],
})
export class UserModule {}
