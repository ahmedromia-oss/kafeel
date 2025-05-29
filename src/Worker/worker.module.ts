import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkerService } from './worker.service';
import { Worker } from './worker.model';
import { WorkerRepository } from './workerRepository';
import { WorkerController } from './worker.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Worker])],
  providers: [WorkerService , WorkerRepository],
  exports: [WorkerService],
  controllers:[WorkerController]
})
export class workerModule {}




