import {
  Body,
  Controller,
  Post,
  Put,
  Get,
  UseGuards,
} from '@nestjs/common';
import { serialize } from '../../Shared/Interceptors/Serialize.Interceptor';
import { ConstantsService } from './constants.service';
import { CreateConstantsDto } from './DTOs/createConstants.dto';
import { UpdateConstantsDto } from './DTOs/updateConstants.dto';
import { Constants } from './constants.model';
import { AuthGuard } from 'src/Auth/Gaurds/auth.gaurd';
import { RoleGuard } from 'src/Auth/Gaurds/Role.gaurd';
import { roles } from 'src/Auth/Decorators/Roles.decorator';
import { UserType } from 'src/constants';
import { getConstantsDto } from './DTOs/getConstants.dto';

@Controller('constants')
export class ConstantsController {
  constructor(private readonly constantsService: ConstantsService) { }

  @Get()
  @serialize(getConstantsDto)
  async getConstants(): Promise<Constants> {
    return await this.constantsService.getConstants();
  }

  @Post()
  @serialize()
  @UseGuards(AuthGuard, RoleGuard)
  @roles(UserType.ADMIN)
  async createConstants(@Body() dto: CreateConstantsDto): Promise<Constants> {
    return await this.constantsService.createConstants(dto);
  }

  @Put()
  @serialize()
  @UseGuards(AuthGuard, RoleGuard)
  @roles(UserType.ADMIN)
  async updateConstants(@Body() dto: UpdateConstantsDto): Promise<string> {
    return await this.constantsService.updateConstants(dto);
  }
}

