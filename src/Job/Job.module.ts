import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplicantsModule } from 'src/Job_Applicants/Job_applicants.module';
import { Job } from './models/job.model';
import { JobService } from './job.service';
import { JobRepository } from './job.repository';


@Module({
  imports: [TypeOrmModule.forFeature([Job]), JobApplicantsModule],
  controllers: [],
  providers: [JobService , JobRepository],
  exports: [JobService],
})
export class JobModule {}
