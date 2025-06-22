import { Injectable } from '@nestjs/common';

import { EntityManager } from 'typeorm';
import { KafeelRepository } from './kafeel.repository';
import { plainToClass } from 'class-transformer';
import { kafeel } from './kafeel.model';

@Injectable()
export class kafeelService {
  constructor(private KafeelRepo: KafeelRepository) {}
  async create(userId: string, manager?: EntityManager) {
    return await this.KafeelRepo.create({ userId: userId }, manager);
  }
  async getProfile(userId: string) {
    return await this.KafeelRepo.findOne({ where: { userId: userId } });
  }
  async getPrivateProfile(userId: string) {
    return await this.KafeelRepo.findOne({
      where: { userId: userId },
    });
  }
  async updateKafeel(id: string, kafeel: kafeel) {
    return await this.KafeelRepo.update({ userId: id }, kafeel);
  }
}
