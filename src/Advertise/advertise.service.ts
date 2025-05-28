// src/transfer-announcement/advertise.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { AdvertiseRepository } from './advertise.repository';
import { WorkerService } from 'src/Worker/worker.service';
import { Advertise } from './advertise.model';

@Injectable()
export class AdvertiseService {
  constructor(
    private readonly advertiseRepo: AdvertiseRepository,
    private readonly workerService: WorkerService,
  ) {}

  /**
   * Get all adverts for a given worker
   */
  async getAdvertises(
    workerId: string,
    skip?: number,
    take?: number,
  ): Promise<Advertise[]> {
    return await this.advertiseRepo.findAll(
      {
        where: { workerId },
      },
      undefined,
      skip,
      take,
    );
  }

  /**
   * Get a single advert by its ID, scoped to the worker
   */
  async deleteAdvertise(advertiseId: string, workerId: string) {
    return await this.advertiseRepo.delete({
      workerId: workerId,
      id: advertiseId,
    });
  }
  async getAdvertiseById(advertiseId: string): Promise<Advertise> {
    return await this.advertiseRepo.findOne({
      where: { id: advertiseId },
    });
  }

  /**
   * Create a new advertise entry
   */
  async createAdvertise(advertise: Advertise): Promise<Advertise> {
    // ensure the worker exists
    advertise.worker = await this.workerService.GetWorker(advertise.workerId);
    return await this.advertiseRepo.create(advertise);
  }

  /**
   * Update an existing advertise entry
   */
  async updateAdvertise(
    advertise: Advertise,
    advertiseId: string,
    workerId: string,
  ): Promise<string> {
    // you might want to verify existence first, or let repository handle 0‑rows‑affected
    return await this.advertiseRepo.update(
      { id: advertiseId, workerId },
      advertise,
    );
  }
}
