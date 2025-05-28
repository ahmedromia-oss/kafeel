import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { user } from 'src/User/Decorators/user.decorator';
import { userToken } from 'src/models/userToken.model';
import { AuthGuard } from 'src/Auth/Gaurds/auth.gaurd';
import { RoleGuard } from 'src/Auth/Gaurds/Role.gaurd';
import { roles } from 'src/Auth/Decorators/Roles.decorator';
import { Code, FileType, UserType } from 'src/constants';

import { serialize } from 'shared/Interceptors/Serialize.Interceptor';
import { plainToClass, plainToInstance } from 'class-transformer';
import { JobApplicantsService } from './Job_Applicants.service';
import { CreateJobDto } from 'src/Job/DTOs/creatJob.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { BucketsService } from 'src/Buckets/buckets.service';
import { CreateJobApplicantDto } from './DTOs/createJobApplicant.dto';
import { JobApplicants } from './Job_applicants.model';
import { getJobApplicantDto } from './DTOs/getJobApplicant.dto';

@Controller('jobApplicant')
export class jobApplicantController {
  constructor(
    private jobApplicantService: JobApplicantsService,
    private bucketService: BucketsService,
  ) {}

  @Post('/job/:jobId')
  @UseInterceptors(FileInterceptor('CV'))
  @serialize(getJobApplicantDto)
  @UseGuards(AuthGuard, RoleGuard)
  @roles(UserType.WORKER)
  async createJob(
    @Param('jobId') jobId: string,
    @user() user: userToken,
    @UploadedFile() CV: Express.Multer.File,
    @Body() data: CreateJobApplicantDto,
  ): Promise<JobApplicants> {
    if (CV) {
      const cv = this.bucketService.saveFile(CV, FileType.CV);
      console.log(cv)
      const jobApplicant = plainToInstance(JobApplicants, data);
      jobApplicant.workerId = user.sub;
      jobApplicant.CV = cv
      jobApplicant.JobId = jobId;
      return await this.jobApplicantService.applyForJob(jobApplicant);
    } else {
      throw new BadRequestException(Code.CV_REQUIRED );
    }
  }
   
}
