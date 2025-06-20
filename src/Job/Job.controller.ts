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
import { JobType, UserType } from 'src/constants';
import { GetJobDto } from './DTOs/getJob.dto';
import { serialize } from 'shared/Interceptors/Serialize.Interceptor';
import { UpdateJobDto } from './DTOs/updateJob.dto';
import { AuthGuard } from 'src/Auth/Gaurds/auth.gaurd';

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
  @UseGuards(AuthGuard)
  @Post('save/:JobId')
  @serialize()
  async saveAdvertise(
    @user() user: userToken,
    @Param('JobId') JobId: string,
  ): Promise<string> {
    // Assuming delete logic is implemented in the service
    return await this.jobService.saveAndDeleteJob(user.sub, JobId);
  }
  @Get('saved/jobs')
  @UseGuards(AuthGuard)
  @serialize(GetJobDto)
  async Getsaved(
    @user() user: userToken,
    @Param('skip') skip: number,
    @Param('take') take: number,
  ): Promise<Job[]> {
    // Assuming delete logic is implemented in the service
    return await this.jobService.getSaved(user.sub, skip, take);
  }

  @Get('search')
  @serialize(GetJobDto)
  async search(
    @Query('searchTerm') searchTerm?: string,
    @Query('category') category?: string,
    @Query('jobType') jobType?: string,
    @Query('country') coutry?: string,
    @Query('skip') skip: number = 0,
    @Query('take') take: number = 5,
  ): Promise<Job[]> {
    // Assuming delete logic is implemented in the service
    return await this.jobService.searchJob(
      searchTerm,
      category,
      jobType,
      coutry,
      skip,
      take,
    );
  }
}
