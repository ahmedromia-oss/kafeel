import { Injectable, NotFoundException } from '@nestjs/common';
import { Skill } from './skills.model';
import { skillRepository } from './skill.repository';
import { WorkerService } from 'src/Worker/worker.service';

@Injectable()
export class SkillService {
  constructor(
    private readonly skillRepo: skillRepository,
    private readonly workerService: WorkerService,
  ) {}

  async createSkill(skill: Skill): Promise<Skill> {
    const worker = await this.workerService.GetWorker(skill.workerId);
    skill.worker = worker;
    return await this.skillRepo.create(skill);
  }

  async getAllSkills(
    workerId: string,
    skip: number = 0,
    take: number = 5,
  ): Promise<Skill[]> {
    return await this.skillRepo.findAll({
      where: { workerId: workerId },
      skip: skip,
      take: take,
    });
  }

  async getSkillById(id: string): Promise<Skill> {
    return await this.skillRepo.findOne({
      where: { id: id },
    });
  }
  async updateSkill(
    id: string,
    workerId: string,
    skill: Skill,
  ): Promise<string> {
    return await this.skillRepo.update({ id: id, workerId: workerId }, skill);
  }
  async deleteSkill(id: string, workerId: string) {
    return await this.skillRepo.delete({ id: id, workerId: workerId });
  }
}
