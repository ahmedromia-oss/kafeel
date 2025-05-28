import { Injectable } from '@nestjs/common';
import { JobRepository } from './job.repository';
import { WorkerService } from 'src/Worker/worker.service';
import { Job } from './models/job.model';
import { companyService } from 'src/company/company.service';

@Injectable()
export class JobService {
  constructor(
    private readonly jobRepo: JobRepository,
    private readonly companyService: companyService,
  ) {}

  async getJobsByCompany(
    companyId: string,
    skip?: number,
    take?: number,
  ): Promise<Job[]> {
    return await this.jobRepo.findAll(
      { where: { companyId } },
      undefined,
      skip,
      take,
    );
  }

  async getJobById(jobId: string): Promise<Job> {
    return await this.jobRepo.findOne({
      where: { id: jobId },
    });
  }
  async getJobs(
    skip?: number,
    take?: number,
  ): Promise<Job[]> {
    return await this.jobRepo.findAll(undefined, undefined, skip, take);
  }

  async createJob(job: Job): Promise<Job> {
    job.company = await this.companyService.getCompany(job.companyId);
    return await this.jobRepo.create(job);
  }

  async updateJob(job: Job, jobId: string, companyId: string): Promise<string> {
    return await this.jobRepo.update({ id: jobId, companyId }, job);
  }

  async deleteJob(jobId: string, companyId: string): Promise<string> {
    return await this.jobRepo.delete({ id: jobId, companyId });
  }
}
