import { Injectable, UseGuards } from '@nestjs/common';
;
import { AwardRepository } from './award.repository';
import { WorkerService } from 'src/Worker/worker.service';
import { Award } from './awards.model';




@Injectable()
export class AwardService {
  constructor(
    private readonly awardRepo: AwardRepository,
    private readonly workerService: WorkerService,
  ) {}

  async getAwards(workerId: string): Promise<Award[]> {
    
    return await this.awardRepo.findAll({ where: { workerId:workerId } });
  }

  async getAwardById(awardId: string): Promise<Award> {
    return await this.awardRepo.findOne({
      where: { id: awardId },
    });
  }

 
  async createAward(award: Award): Promise<Award> {
    award.worker = await this.workerService.GetWorker(award.workerId);
    
    return await this.awardRepo.create(award);
  }
 
  async updateAward(award: Award, awardId: string, workerId: string): Promise<string> {
    return await this.awardRepo.update(
      { id: awardId, workerId:workerId },
      award,
    );
  }
  async deleteAward(awardId:string , wokerID:string):Promise<string>{
    return await this.awardRepo.delete({id:awardId , workerId:wokerID})
  }
}
