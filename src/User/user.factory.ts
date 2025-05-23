import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { UserType } from 'src/constants';
import { kafeelService } from 'src/Kafeel/kafeel.service';
import { WorkerService } from 'src/Worker/worker.service';


@Injectable()
export class UserFactoryService {
  constructor(private readonly moduleRef: ModuleRef) {}

  getService(userType: UserType) {
    switch (userType) {
      case UserType.WORKER:
        return this.moduleRef.get(WorkerService, { strict: false });
      case UserType.KAFEEL:
        return this.moduleRef.get(kafeelService , {strict:false})
    }
  }
}
