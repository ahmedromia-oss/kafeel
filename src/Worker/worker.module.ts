import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkerService } from './worker.service';
import { Worker } from './worker.model';
import { WorkerRepository } from './workerRepository';


@Module({
  imports: [TypeOrmModule.forFeature([Worker])],
  providers: [WorkerService , WorkerRepository],
  exports: [WorkerService],
})
export class workerModule {}




