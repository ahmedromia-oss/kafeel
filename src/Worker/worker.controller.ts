import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Put,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { WorkerService } from './worker.service'; // adjust path
import { serialize } from 'shared/Interceptors/Serialize.Interceptor';
import { getWorkerDto } from './DTOs/getWorker.dto';
import { user } from 'src/User/Decorators/user.decorator';
import { userToken } from 'src/models/userToken.model';
import { updateWorker } from './DTOs/updateWorker.dto';
import { plainToInstance } from 'class-transformer';
import { Worker } from './worker.model';
import { AuthGuard } from 'src/Auth/Gaurds/auth.gaurd';
import { RoleGuard } from 'src/Auth/Gaurds/Role.gaurd';
import { roles } from 'src/Auth/Decorators/Roles.decorator';
import { FileType, UserType } from 'src/constants';
import { FileInterceptor } from '@nestjs/platform-express';
import { BucketsService } from 'src/Buckets/buckets.service';

@Controller('worker')
export class WorkerController {
  constructor(
    private readonly workerService: WorkerService,
    private readonly bucketService: BucketsService,
  ) {}
  @Put()
  @UseGuards(AuthGuard, RoleGuard)
  @serialize(getWorkerDto)
  @roles(UserType.WORKER)
  @UseInterceptors(FileInterceptor('cv'))
  async updateWorker(
    @user() user: userToken,
    @Body() updateWorkerDto: updateWorker,
    @UploadedFile() cv?: Express.Multer.File,
  ) {
    const worker = plainToInstance(Worker, updateWorkerDto);
    if (cv) {
      worker.cv = this.bucketService.saveFile(cv, FileType.CV);
    }
    return await this.workerService.updateWorker(user.sub, worker);
  }
}
