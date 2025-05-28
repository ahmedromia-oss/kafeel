import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplicantsRepository } from './Job_applicants.repository';
import { JobApplicants } from './Job_applicants.model';
import { workerModule } from 'src/Worker/worker.module';
import { JobApplicantsService } from './Job_Applicants.service';
import { JobModule } from 'src/Job/Job.module';
import { jobApplicantController } from './job_applicant.controller';
import { TokenModule } from 'src/JWT/jwt.module';
import { BucketsModule } from 'src/Buckets/buckets.module';


@Module({
  imports: [TypeOrmModule.forFeature([JobApplicants]),  workerModule , JobModule , TokenModule , BucketsModule],
  controllers: [jobApplicantController],
  providers: [JobApplicantsService , JobApplicantsRepository],
  exports: [],
})
export class JobApplicantsModule {}
