// src/transfer-announcement/advertise.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { AdvertiseRepository } from './advertise.repository';
import { WorkerService } from 'src/Worker/worker.service';
import { Advertise } from './advertise.model';
import { UserSavedAdvertiseRepository } from 'src/User/repositories/userSavedJobs.repository';
import { Code, JobType, UserType, valuesString } from 'src/constants';
import { user } from 'src/User/Decorators/user.decorator';
import { EntityManager, ILike, In } from 'typeorm';
import { UserService } from 'src/User/user.service';
import { UnitOfWork } from 'src/UnitOfWork/unitOfWork.service';
import { User } from 'src/User/models/user.model';
import { Worker } from 'src/Worker/worker.model';

@Injectable()
export class AdvertiseService {
  constructor(
    private readonly userService: UserService,
    private readonly userSavedRepo: UserSavedAdvertiseRepository,
    private readonly advertiseRepo: AdvertiseRepository,
    private readonly workerService: WorkerService,
  ) {}

  /**
   * Get all adverts for a given worker
   */
  async getAllAdvertises(skip: number = 0, take: number = 5) {
    return await this.advertiseRepo.findAll({
      where: { IsOpen: true },
      relations: { worker: true, company: true, savedByUsers: true },
      skip: skip,
      take: take,
    });
  }
  async getAdvertises(
    userId: string,
    skip: number = 0,
    take: number = 5,
  ): Promise<Advertise[]> {
    return await this.advertiseRepo.findAll({
      where: [
        { companyId: userId, IsOpen: true },
        { workerId: userId, IsOpen: true },
      ],
      relations: { savedByUsers: true },
      skip: skip,
      take: take,
    });
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
      relations: { savedByUsers: true },
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

  async saveAndDeleteAdvertise(userId: string, advertiseId: string) {
    await this.advertiseRepo.findOne({ where: { id: advertiseId } });
    try {
      await this.userSavedRepo.findOne({
        where: { userId: userId, advertiseId: advertiseId },
      });
      return await this.userSavedRepo.delete({
        userId: userId,
        advertiseId: advertiseId,
      });
    } catch (e) {
      if (e instanceof NotFoundException) {
        await this.userSavedRepo.create({
          userId: userId,
          advertiseId: advertiseId,
        });
        return valuesString.UPDATED;
      }
    }
  }
  async getSaved(userId: string, skip = 0, take = 5) {
    return (
      await this.userSavedRepo.findAll({
        order: { createdAt: 'DESC' },
        where: { userId: userId },
        skip: skip,
        take: take,
        relations: {
          advertise: { worker: true, company: true, savedByUsers: true },
        },
      })
    ).map((e) => e.advertise);
  }
  async searchAdvertise(
    searchTerm?: string,
    category?: string,
    jobType?: string,
    country?: string,
    skip: number = 0,
    take: number = 5,
  ) {
    return await this.advertiseRepo.searchAdvertise(
      searchTerm,
      jobType,
      category,
      country,
      skip,
      take,
    );
  }
  async addAdvertiseForCompany(advertise: Advertise, companyId: string) {
    const company = await this.userService.getUserById(companyId);
    return await this.advertiseRepo.create({
      ...advertise,
      company,
      companyId,
    });
  }
}
