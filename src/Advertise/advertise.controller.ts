import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { user } from 'src/User/Decorators/user.decorator';
import { userToken } from 'src/models/userToken.model';
import { AuthGuard } from 'src/Auth/Gaurds/auth.gaurd';
import { RoleGuard } from 'src/Auth/Gaurds/Role.gaurd';
import { roles } from 'src/Auth/Decorators/Roles.decorator';
import { PERMISSION, UserType } from 'src/constants';

import { serialize } from 'shared/Interceptors/Serialize.Interceptor';
import { plainToClass, plainToInstance } from 'class-transformer';

import { AdvertiseService } from './advertise.service';
import { Advertise } from './advertise.model';
import { GetAdvertiseDto } from './DTOs/getAdvertise.dto';
import { CreateAdvertiseDto } from './DTOs/createAdvertise.dto';
import { UpdateAdvertiseDto } from './DTOs/updateAdvertise.dto';
import { getAdvertiseForKafeel } from './DTOs/getAdvertiseForKafeelDto';
import { get } from 'http';
import { CreateAdvertiseForCompanyDto } from './DTOs/createAdvertiseForCompany';
import { permissions } from 'src/Auth/Decorators/permissions.decorator';

@Controller('advertises')
export class AdvertiseController {
  constructor(private advertiseService: AdvertiseService) {}

  // GET /advertises/worker/:workerId
  @Get('worker/:workerId')
  @serialize(GetAdvertiseDto)
  async getAdvertises(
    @Param('workerId') workerId: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ): Promise<Advertise[]> {
    return await this.advertiseService.getAdvertises(workerId, skip, take);
  }
  @Get('/')
  @serialize(getAdvertiseForKafeel)
  async getGlobalAdvertises(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    return await this.advertiseService.getAllAdvertises(skip, take);
  }
  // GET /advertises/:advertiseId
  @Get(':advertiseId')
  @serialize(GetAdvertiseDto)
  async getAdvertiseById(
    @Param('advertiseId') advertiseId: string,
  ): Promise<Advertise> {
    return await this.advertiseService.getAdvertiseById(advertiseId);
  }

  // POST /advertises
  @Post()
  @serialize(GetAdvertiseDto)
  @UseGuards(AuthGuard, RoleGuard)
  @roles(UserType.WORKER, UserType.COMPANY)
  async createAdvertise(
    @user() user: userToken,
    @Body() addAdvertise: CreateAdvertiseDto,
  ): Promise<Advertise> {
    const advertise = plainToClass(Advertise, addAdvertise);
    advertise.workerId = user.sub;
    return await this.advertiseService.createAdvertise(advertise);
  }

  // PUT /advertises/:advertiseId
  @Put(':advertiseId')
  @serialize()
  @UseGuards(AuthGuard, RoleGuard)
  @roles(UserType.WORKER, UserType.COMPANY)
  async updateAdvertise(
    @user() user: userToken,
    @Param('advertiseId') advertiseId: string,
    @Body() updateAdvertise: UpdateAdvertiseDto,
  ): Promise<string> {
    const advertise = plainToInstance(Advertise, updateAdvertise);
    return await this.advertiseService.updateAdvertise(
      advertise,
      advertiseId,
      user.sub,
    );
  }

  // DELETE /advertises/:advertiseId
  @Delete(':advertiseId')
  @serialize()
  @UseGuards(AuthGuard, RoleGuard)
  @roles(UserType.WORKER)
  async deleteAdvertise(
    @user() user: userToken,
    @Param('advertiseId') advertiseId: string,
  ): Promise<string> {
    // Assuming delete logic is implemented in the service
    return await this.advertiseService.deleteAdvertise(advertiseId, user.sub);
  }
  @UseGuards(AuthGuard)
  @Post('save/:advertiseId')
  @serialize()
  async saveAdvertise(
    @user() user: userToken,
    @Param('advertiseId') advertiseId: string,
  ): Promise<string> {
    // Assuming delete logic is implemented in the service
    return await this.advertiseService.saveAndDeleteAdvertise(
      user.sub,
      advertiseId,
    );
  }
  @UseGuards(AuthGuard)
  @Get('saved/advertise')
  @serialize(GetAdvertiseDto)
  async Getsaved(
    @user() user: userToken,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ): Promise<Advertise[]> {
    // Assuming delete logic is implemented in the service
    return await this.advertiseService.getSaved(user.sub, skip, take);
  }
  @Get('search')
  @serialize(GetAdvertiseDto)
  async search(
    @Query('searchTerm') searchTerm?: string,
    @Query('category') category?: string,
    @Query('jobType') jobType?: string,
    @Query('country') coutry?: string,
    @Query('skip') skip: number = 0,
    @Query('take') take: number = 5,
  ): Promise<Advertise[]> {
    // Assuming delete logic is implemented in the service
    return await this.advertiseService.searchAdvertise(
      searchTerm,
      category,
      jobType,
      coutry,
      skip,
      take,
    );
  }
  @Post()
  @serialize(GetAdvertiseDto)
  @UseGuards(AuthGuard, RoleGuard)
  @roles(UserType.COMPANY)
  @permissions(PERMISSION.IS_APPROVED)
  async createAdvertiseForCompany(
    @user() user: userToken,
    @Body() addAdvertise: CreateAdvertiseForCompanyDto,
  ): Promise<Advertise> {
    const advertise = plainToClass(Advertise, addAdvertise);
    return await this.advertiseService.addAdvertiseForCompany(
      advertise,
      user.sub,
    );
  }
}
