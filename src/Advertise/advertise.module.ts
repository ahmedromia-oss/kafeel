// src/transfer-announcement/transfer-announcement.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advertise } from './advertise.model';
import { AdvertiseRepository } from './advertise.repository';
import { AdvertiseService } from './advertise.service';
import { workerModule } from 'src/Worker/worker.module';
import { AdvertiseController } from './advertise.controller';
import { TokenModule } from 'src/JWT/jwt.module';
import { UserSavedAdvertise } from 'src/User/models/userAdvertiseSaved.model';
import { UserSavedAdvertiseRepository } from 'src/User/repositories/userSavedJobs.repository';
import { UserModule } from 'src/User/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Advertise]),
    workerModule,
    TokenModule,
    UserModule,
  ],
  providers: [AdvertiseService, AdvertiseRepository],
  controllers: [AdvertiseController],
  exports: [AdvertiseService],
})
export class AdvertiseModule {}
