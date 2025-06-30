import { Injectable, NotFoundException } from '@nestjs/common';
import { JobRepository } from './job.repository';
import { WorkerService } from 'src/Worker/worker.service';
import { Job } from './models/job.model';
import { companyService } from 'src/company/company.service';
import { UserSavedJobRepository } from 'src/User/repositories/userSavedAdvertise.repository';
import { JobType, valuesString } from 'src/constants';
import { ILike, In } from 'typeorm';
import { user } from 'src/User/Decorators/user.decorator';
import e from 'express';

@Injectable()
export class JobService {
  constructor(
    private readonly userSavedRepo: UserSavedJobRepository,
    private readonly jobRepo: JobRepository,
    private readonly companyService: companyService,
  ) {}

  async getJobsByCompany(
    companyId: string,
    skip: number = 0,
    take: number = 5,
  ): Promise<Job[]> {
    return await this.jobRepo.findAll({
      relations: { savedByUsers: true , applicants:true },
      where: { companyId },
      skip: skip,
      take: take,
    });
  }

  async getJobById(jobId: string): Promise<Job> {
    return await this.jobRepo.findOne({
      where: { id: jobId },
      relations: { applicants: true, savedByUsers: true , company: { Jobs: true } },
    });
  }
  async getJobs(skip: number = 0, take: number = 5): Promise<Job[]> {
    return await this.jobRepo.findAll({
      relations: {
        savedByUsers: true,
        applicants: true,
        company: { Jobs: true  },
      },
      skip: skip,
      take: take,
    });
  }

  async createJob(job: Job): Promise<Job> {
    job.company = await this.companyService.getCompany(job.companyId);
    return await this.jobRepo.create(job);
  }

  async getJobByUserApplied(userId:string , skip?:number , take?:number){

    return await this.jobRepo.findAll({where:{applicants:{userId:userId} } , relations:{applicants:true , savedByUsers:true} , skip:skip , take:take})

  }
  async updateJob(job: Job, jobId: string, companyId: string): Promise<string> {
    return await this.jobRepo.update({ id: jobId, companyId }, job);
  }

  async deleteJob(jobId: string, companyId: string): Promise<string> {
    return await this.jobRepo.delete({ id: jobId, companyId });
  }
  async saveAndDeleteJob(userId: string, jobId: string) {
    await this.jobRepo.findOne({ where: { id: jobId } });
    try {
      await this.userSavedRepo.findOne({
        where: { userId: userId, jobId: jobId },
      });
      return await this.userSavedRepo.delete({ userId: userId, jobId: jobId });
    } catch (e) {
      if (e instanceof NotFoundException) {
        await this.userSavedRepo.create({
          userId: userId,
          jobId: jobId,
        });
        return valuesString.UPDATED;
      }
    }
  }
  async getSaved(userId: string, skip = 0, take = 5) {
    return (
      await this.userSavedRepo.findAll({
        order: { createdAt: 'DESC' },
        where: { userId: userId },
        skip: skip,
        take: take,
        relations: { job: { company: true, applicants: true }},
      })
    ).map((e) => e.job);
  }
  async searchJob(
    companyId?: string,
    searchTerm?: string,
    category?: string,
    jobType?: string,
    country?: string,
    skip?: number,
    take?: number,
  ) {
    return await this.jobRepo.searchJobs(
      companyId,
      searchTerm,
      category,
      jobType,
      country,
      skip,
      take,
    );
  }
}
