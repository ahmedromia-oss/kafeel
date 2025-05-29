import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { WorkerService } from './worker.service'; // adjust path
import { getProfileDto } from '../User/DTOs/getProfile.dto';
import { serialize } from 'shared/Interceptors/Serialize.Interceptor';

@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}


}
