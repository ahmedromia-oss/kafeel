import { Injectable } from '@nestjs/common';

import { privateDecrypt } from 'crypto';
import { WorkerService } from 'src/Worker/worker.service';
import { JobApplicantsRepository } from './Job_applicants.repository';
import { JobApplicants } from './Job_applicants.model';
import { JobService } from 'src/Job/job.service';
import { UserSavedAdvertise } from 'src/User/models/userAdvertiseSaved.model';
import { UserService } from 'src/User/user.service';
import { valuesString } from 'src/constants';

@Injectable()
export class JobApplicantsService {
  constructor(
    private readonly jobApplicantsRepository: JobApplicantsRepository,
    private readonly jobService: JobService,
    private readonly userService: UserService,
  ) {}

  async applyForJob(jobApplicant: JobApplicants) {
    const user = await this.userService.getUserById(jobApplicant.userId);
    const job = await this.jobService.getJobById(jobApplicant.JobId);
    jobApplicant.User = user;
    jobApplicant.job = job;
    try {
      return await this.jobApplicantsRepository.findOne({
        where: { userId: user.id, JobId: job.id },
      });
    } catch {
      return await this.jobApplicantsRepository.create(jobApplicant);
    }
  }

  async getApplications(
    jobId: string,
    companyId: string,
    skip: number = 0,
    take: number = 5,
  ) {
    return await this.jobApplicantsRepository.findAll({
      where: { JobId: jobId, job: { companyId: companyId } },
      relations: { job: true, User: true },
      skip: skip,
      take: take,
    });
  }
}
