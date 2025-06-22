import { Injectable } from '@nestjs/common';
import { WorkerRepository } from './workerRepository';
import { Worker } from './worker.model';
import { EntityManager } from 'typeorm';

@Injectable()
export class WorkerService {
  constructor(private workerRepo: WorkerRepository) {}
  async create(userId: string, manager?: EntityManager) {
    return await this.workerRepo.create({ userId: userId }, manager);
  }
  async GetWorker(workerId: string): Promise<Worker> {
    return await this.workerRepo.findOne({ where: { userId: workerId } });
  }
  async getProfile(userId: string) {
    return await this.workerRepo.findOne({
      where: { userId: userId },
      relations: {
        experiences: true,
        educations: true,
        skills: true,
        languages: true,
        awards: true,
        advertises: true,
      },
    });
  }

  async getPrivateProfile(userId: string) {
    return await this.workerRepo.findOne({
      where: { userId: userId },
      relations: {
        experiences: true,
        educations: true,
        skills: true,
        languages: true,
        awards: true,
        advertises: true,
        
      },
    });
  }
  async updateWorker(
    workerId: string,
    worker: Worker,
    manager?: EntityManager,
  ) {
    if (manager) {
      return await this.workerRepo.update(
        { userId: workerId },
        worker,
        manager,
      );
    }
    return await this.workerRepo.update({ userId: workerId }, worker);
  }
}
