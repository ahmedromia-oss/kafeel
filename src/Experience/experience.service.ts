import { ForbiddenException, Injectable } from '@nestjs/common';

import { WorkerService } from 'src/Worker/worker.service';
import { Experience } from './Experience.model';
import { experienceRepository } from './Experience.repository';
import { user } from 'src/User/Decorators/user.decorator';
import multer from 'multer';

@Injectable()
export class experienceService {
  constructor(
    private experienceRepo: experienceRepository,
    private workerService: WorkerService,
  ) {}
  async getexperiences(workerId: string , skip?:number , take?:number): Promise<Experience[]> {
    return await this.experienceRepo.findAll({ where: { workerId: workerId } } , undefined , skip , take);
  }
  async getexperienceById(experienceId: string) {
    return await this.experienceRepo.findOne({
      where: { id: experienceId },
    });
  }
  async createExperience(experience: Experience): Promise<Experience> {
    experience.worker = await this.workerService.GetWorker(experience.workerId);
    return await this.experienceRepo.create(experience);
  }
  async updateExperience(
    experience: Experience,
    experienceId: string,
    userId: string,
  ): Promise<string> {
    return await this.experienceRepo.update(
      { id: experienceId, workerId: userId },
      experience,
    );
  }
  async deleteExperience(experienceId , userId){
    return await this.experienceRepo.delete({id:experienceId , workerId:userId})
  }
}
