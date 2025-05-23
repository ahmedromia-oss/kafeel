import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplicantsRepository } from './Job_applicants.repository';
import { JobApplicants } from './Job_applicants.model';
import { workerModule } from 'src/Worker/worker.module';
import { JobApplicantsService } from './Job_Applicants.service';
import { JobModule } from 'src/Job/Job.module';


@Module({
  imports: [TypeOrmModule.forFeature([JobApplicants]),  workerModule , JobModule],
  controllers: [],
  providers: [JobApplicantsService , JobApplicantsRepository],
  exports: [],
})
export class JobApplicantsModule {}
