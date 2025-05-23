import { Injectable } from '@nestjs/common';
import { JobRepository } from './job.repository';
import { WorkerService } from 'src/Worker/worker.service';
import { Job } from './models/job.model';

@Injectable()
export class JobService {
  constructor(
    private readonly jobRepo: JobRepository,
    private readonly workerService: WorkerService,
  ) {}

//   async getJobs(workerId: string): Promise<Job[]> {
//     return await this.jobRepo.findAll({ where: { workerId } });
//   }

  async getJobById(jobId: string): Promise<Job> {
    return await this.jobRepo.findOne({
      where: { id: jobId },
    });
  }
  

//   async createJob(job: Job): Promise<Job> {
//     job = await this.workerService.GetWorker(job.workerId);
//     return await this.jobRepo.create(job);
//   }

//   async updateJob(job: Job, jobId: string, workerId: string): Promise<string> {
//     return await this.jobRepo.update(
//       { id: jobId, workerId },
//       job,
//     );
//   }

//   async deleteJob(jobId: string, workerId: string): Promise<string> {
//     return await this.jobRepo.delete({ id: jobId, workerId });
//   }
//   async applyForJob(jobId:string , workerId:string):Promise<string>{
//     return await 
//   }
}
