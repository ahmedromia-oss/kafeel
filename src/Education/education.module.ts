import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Education } from './education.model';
import { educationService } from './education.service';
import { educationRepository } from './education.repository';

import { workerModule } from 'src/Worker/worker.module';
import { educationController } from './education.controller';
import { TokenModule } from 'src/JWT/jwt.module';


@Module({
  imports: [TypeOrmModule.forFeature([Education]) ,workerModule , TokenModule],
  providers: [educationService , educationRepository],
  exports: [],
  controllers:[educationController]
})
export class EducationModule {}




