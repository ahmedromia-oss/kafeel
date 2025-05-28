import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplicantsModule } from 'src/Job_Applicants/Job_applicants.module';
import { Job } from './models/job.model';
import { JobService } from './job.service';
import { JobRepository } from './job.repository';
import { JobController } from './Job.controller';
import { TokenModule } from 'src/JWT/jwt.module';
import { companyModule } from 'src/company/company.module';


@Module({
  imports: [TypeOrmModule.forFeature([Job]) , TokenModule , companyModule],
  controllers: [JobController],
  providers: [JobService , JobRepository],
  exports: [JobService],
})
export class JobModule {}
