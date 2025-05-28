import { BadRequestException, NotFoundException } from '@nestjs/common';
import { take } from 'rxjs';

import { Code, valuesString } from 'src/constants';

import {
  Repository,
  DeepPartial,
  FindOneOptions,
  FindManyOptions,
  FindOptionsWhere,
  EntityManager,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
export class GenericRepository<T> {
  constructor(private readonly repository: Repository<T>) {}

  private getRepo(manager?: EntityManager): Repository<T> {
    return manager
      ? manager.getRepository<T>(this.repository.target as any)
      : this.repository;
  }
  public async checkIFExists(options: FindManyOptions<T>) {
    return await this.getRepo().exists(options);
  }
  async create(data: DeepPartial<T>, manager?: EntityManager): Promise<T> {
    const entity = this.getRepo(manager).create(data);
    return await this.getRepo(manager).save(entity);
  }

  async findAll(
    options?: FindManyOptions<T>,
    manager?: EntityManager,
    skip:number = 0 ,
    take:number = 5
  ): Promise<T[]> {
    return await this.getRepo(manager).find({...options , skip:skip , take:take});
  }

  async findById(
    id: number | string,
    options?: FindOneOptions<T>,
    manager?: EntityManager,
  ): Promise<T | null> {
    try {
      return await this.getRepo(manager).findOneOrFail({
        where: { id } as any,
        ...options,
      });
    } catch {
      throw new NotFoundException();
    }
  }
  async findOne(
    options: FindOneOptions<T>,
    manager?: EntityManager,
  ): Promise<T | null> {
    try {
      return await this.getRepo(manager).findOneOrFail(options);
    } catch {
      throw new NotFoundException();
    }
  }

  async update(
    Options: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    data: QueryDeepPartialEntity<T>,
    manager?: EntityManager,
  ): Promise<string> {
    if (await this.checkIFExists({ where: Options })) {
      try{
      await this.getRepo(manager).update(Options, data);
      }
      catch(e){
      throw new BadRequestException("NO_CHANGED_VALUES");
        
      }
      return valuesString.UPDATED;
    } else {
      throw new NotFoundException();
    }
  }

  async delete(
    options: FindOptionsWhere<T>[] | FindOptionsWhere<T>,
    manager?: EntityManager,
  ): Promise<string> {
    if (await this.checkIFExists({ where: options })) {
      await this.getRepo(manager).delete(options);
      return Code.DELETED;
    }
    else{
      throw new NotFoundException();
    }
  }
}
