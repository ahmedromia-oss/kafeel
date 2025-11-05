import { Injectable, NotFoundException } from '@nestjs/common';
import { Constants } from './constants.model';
import { ConstantsRepository } from './constants.repository';
import { CreateConstantsDto } from './DTOs/createConstants.dto';
import { UpdateConstantsDto } from './DTOs/updateConstants.dto';

@Injectable()
export class ConstantsService {
  constructor(private readonly constantsRepo: ConstantsRepository) {}

  async createConstants(dto: CreateConstantsDto): Promise<Constants> {
    // Check if constants already exist
    const existing = await this.constantsRepo.findOne({
      where: { id: 'constants' },
    }).catch(() => null);

    if (existing) {
      // If exists, update instead
      await this.constantsRepo.update({ id: 'constants' }, dto);
      return this.getConstants();
    }

    // Create new constants
    return await this.constantsRepo.create({
      id: 'constants',
      ...dto,
    });
  }

  async getConstants(): Promise<Constants> {
    const constants = await this.constantsRepo.findOne({
      where: { id: 'constants' },
    }).catch(() => null);

    if (!constants) {
      throw new NotFoundException('Constants not found');
    }

    return constants;
  }

  async updateConstants(dto: UpdateConstantsDto): Promise<string> {
    const existing = await this.constantsRepo.findOne({
      where: { id: 'constants' },
    }).catch(() => null);

    if (!existing) {
      throw new NotFoundException('Constants not found. Please create them first.');
    }

    return await this.constantsRepo.update({ id: 'constants' }, dto);
  }
}

