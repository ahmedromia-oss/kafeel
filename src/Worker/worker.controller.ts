import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';
import { WorkerService } from './worker.service'; // adjust path
import { getProfileDto } from '../User/DTOs/getProfile.dto';
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
import { UserType } from 'src/constants';

@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}
  @Put()
  @UseGuards(AuthGuard, RoleGuard)
  @serialize(getWorkerDto)
  @roles(UserType.WORKER)
  async updateWorker(
    @user() user: userToken,
    @Body() updateWorkerDto: updateWorker,
  ) {
    const worker = plainToInstance(Worker, updateWorkerDto);
    return await this.workerService.updateWorker(user.sub, worker);
  }
}
