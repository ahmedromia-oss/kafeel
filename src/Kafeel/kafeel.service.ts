import { Injectable } from '@nestjs/common';

import { EntityManager } from 'typeorm';
import { KafeelRepository } from './kafeel.repository';
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
}
