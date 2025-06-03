import { ForbiddenException, Injectable } from '@nestjs/common';

import { WorkerService } from 'src/Worker/worker.service';
import { languageRepository } from './language.repository';
import { Language } from './languages.model';


@Injectable()
export class LanguageService {
  constructor(
    private LanguageRepo: languageRepository,
    private workerService: WorkerService,
  ) {}
  async getLanguages(workerId: string, skip:number = 0 , take:number = 5): Promise<Language[]> {
    return await this.LanguageRepo.findAll({ where: { workerId: workerId }  , skip:skip , take:take} , 
      
    );
  }
  async getLanguageById(languageId: string) {
    return await this.LanguageRepo.findOne({
      where: { id: languageId },
    });
  }
  async createLanguage(language: Language): Promise<Language> {
    language.worker = await this.workerService.GetWorker(language.workerId);
    return await this.LanguageRepo.create(language);
  }
  async updateLanguage(
    language: Language,
    languageId: string,
    userId: string,
  ): Promise<string> {
    return await this.LanguageRepo.update(
      { id: languageId, workerId: userId },
      language,
    );
    
  }
  async deleteLanguage(id:string , userId:string):Promise<string>{
    return await this.LanguageRepo.delete({id:id , workerId:userId})
  }
}
