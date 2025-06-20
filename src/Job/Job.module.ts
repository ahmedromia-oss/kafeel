import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './models/job.model';
import { JobService } from './job.service';
import { JobRepository } from './job.repository';
import { JobController } from './Job.controller';
import { TokenModule } from 'src/JWT/jwt.module';
import { companyModule } from 'src/company/company.module';
import { UserSavedJob } from 'src/User/models/userJobSaved';
import { UserModule } from 'src/User/user.module';


@Module({
  imports: [TypeOrmModule.forFeature([Job , UserSavedJob]) , TokenModule , companyModule , UserModule],
  controllers: [JobController],
  providers: [JobService , JobRepository],
  exports: [JobService],
})
export class JobModule {}
