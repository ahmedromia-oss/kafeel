import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkerService } from './worker.service';
import { Worker } from './worker.model';
import { WorkerRepository } from './workerRepository';
import { WorkerController } from './worker.controller';
import { TokenModule } from 'src/JWT/jwt.module';
import { BucketsModule } from 'src/Buckets/buckets.module';

@Module({
  imports: [TypeOrmModule.forFeature([Worker]), TokenModule, BucketsModule],
  providers: [WorkerService, WorkerRepository],
  exports: [WorkerService],
  controllers: [WorkerController],
})
export class workerModule {}
