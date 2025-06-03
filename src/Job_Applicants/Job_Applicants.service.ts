import { Injectable } from '@nestjs/common';

import { privateDecrypt } from 'crypto';
import { WorkerService } from 'src/Worker/worker.service';
import { JobApplicantsRepository } from './Job_applicants.repository';
import { JobApplicants } from './Job_applicants.model';
import { JobService } from 'src/Job/job.service';

@Injectable()
export class JobApplicantsService {
  constructor(
    private readonly jobApplicantsRepository: JobApplicantsRepository,
    private readonly jobService: JobService,
    private readonly workerService: WorkerService,
  ) {}

  async applyForJob(jobApplicant: JobApplicants) {
    const worker = await this.workerService.GetWorker(jobApplicant.workerId);
    const job = await this.jobService.getJobById(jobApplicant.JobId);
    jobApplicant.worker = worker;
    jobApplicant.job = job;
    return await this.jobApplicantsRepository.create(jobApplicant);
  }

async getApplications(
    jobId: string,
    companyId: string,
    skip: number = 0,
    take: number = 5,
  ) {
    return  await this.jobApplicantsRepository.findAll(
      { where: { JobId:jobId , job:{companyId:companyId} } , relations:{job:true , worker:true} , skip:skip , take:take },
    
     
    );
   
  }
  
}
