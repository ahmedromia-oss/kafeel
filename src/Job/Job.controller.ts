// src/job/job.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JobService } from './job.service';

import { Job } from './models/job.model';
import { CreateJobDto } from './DTOs/creatJob.dto';
import { plainToInstance } from 'class-transformer';
import { userToken } from 'src/models/userToken.model';
import { user } from 'src/User/Decorators/user.decorator';

import { RoleGuard } from 'src/Auth/Gaurds/Role.gaurd';
import { roles } from 'src/Auth/Decorators/Roles.decorator';
import { UserType } from 'src/constants';
import { GetJobDto } from './DTOs/getJob.dto';
import { serialize } from 'shared/Interceptors/Serialize.Interceptor';
import { UpdateJobDto } from './DTOs/updateJob.dto';
import { AuthGuard } from 'src/Auth/Gaurds/auth.gaurd';
import { get } from 'http';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @serialize(GetJobDto)
  @UseGuards(AuthGuard, RoleGuard)
  @roles(UserType.COMPANY)
  async createJob(
    @Body() createJobDto: CreateJobDto,
    @user() user: userToken,
  ): Promise<Job> {
    const job = plainToInstance(Job, createJobDto);
    job.companyId = user.sub;
    return await this.jobService.createJob(job);
  }
  @Put(':jobId')
  @serialize()
  @UseGuards(AuthGuard, RoleGuard)
  @roles(UserType.COMPANY)
  async updateJob(
    @Param('jobId') jobId: string,
    @Body() updateJob: UpdateJobDto,
    @user() user: userToken,
  ): Promise<string> {
    const job = plainToInstance(Job, updateJob);
    return await this.jobService.updateJob(job, jobId, user.sub);
  }
  @Get(':jobId')
  @serialize(GetJobDto)
  async getJobById(@Param('jobId') jobId: string): Promise<Job> {
    return await this.jobService.getJobById(jobId);
  }

  // GET /jobs/company/:companyId
  @Get('company/:companyId')
  @serialize(GetJobDto)
  async getCompanyJobs(
    @Param('companyId') companyId: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ): Promise<Job[]> {
    return this.jobService.getJobsByCompany(companyId, skip, take);
  }

  // DELETE /jobs/:jobId
  @Delete(':jobId')
  @serialize()
  @UseGuards(AuthGuard, RoleGuard)
  @roles(UserType.COMPANY)
  async deleteJob(
    @user() user: userToken,
    @Param('jobId') jobId: string,
  ): Promise<string> {
    return this.jobService.deleteJob(jobId, user.sub);
  }
  @Get()
  @serialize(GetJobDto)
  async getJobs(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ): Promise<Job[]> {
    return this.jobService.getJobs(skip, take);
  }
  @Get('applications/:jobId')
  @UseGuards(AuthGuard, RoleGuard)
  @roles(UserType.COMPANY)
  @serialize()
  async getApplications(
    @user() user: userToken,
    @Param('jobId') jobId: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    return await this.jobService.getApplications(jobId, user.sub, skip, take);
  }
}
