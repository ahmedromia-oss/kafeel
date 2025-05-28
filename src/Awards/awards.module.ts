import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Award } from './awards.model';
import { workerModule } from 'src/Worker/worker.module';
import { AwardService } from './award.service';
import { AwardRepository } from './award.repository';
import { AwardController } from './Awards.contorller';
import { TokenModule } from 'src/JWT/jwt.module';
import { BucketsModule } from 'src/Buckets/buckets.module';



@Module({
  imports: [TypeOrmModule.forFeature([Award]) , workerModule , TokenModule , BucketsModule],
  providers: [AwardService , AwardRepository],
  controllers:[AwardController],
  exports: [],
})
export class AwardModule {}




