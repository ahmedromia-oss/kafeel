import { ForbiddenException, Injectable } from '@nestjs/common';

import { educationRepository } from './education.repository';
import { Education } from './education.model';
import { WorkerService } from 'src/Worker/worker.service';

@Injectable()
export class educationService {
  constructor(
    private educationRepo: educationRepository,
    private workerService: WorkerService,
  ) {}
  async getEducations(workerId: string): Promise<Education[]> {
    return await this.educationRepo.findAll({ where: { workerId: workerId } });
  }
  async getEducationById(educationId: string) {
    return await this.educationRepo.findOne({
      where: { id: educationId },
    });
  }
  async createEducation(education: Education): Promise<Education> {
    education.worker = await this.workerService.GetWorker(education.workerId);
    return await this.educationRepo.create(education);
  }
  async updateEducation(
    education: Education,
    educationId: string,
    userId: string,
  ): Promise<string> {
    return await this.educationRepo.update(
      { id: educationId, workerId: userId },
      education,
    );
  }
  async deleteEducation(id:string , workerId:string){

    return await this.educationRepo.delete({id:id , workerId:workerId})

  }
}
