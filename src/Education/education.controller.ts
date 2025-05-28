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
import { UserType } from 'src/constants';

import { serialize } from 'shared/Interceptors/Serialize.Interceptor';
import { plainToClass, plainToInstance } from 'class-transformer';
import { educationService } from './education.service';
import { getEducationDto } from './DTOs/getEducation.dto';
import { Education } from './education.model';
import { createEducationDto } from './DTOs/createEducation.dto';
import { updateEducationDto } from './DTOs/updateEducation.dto';

@Controller('education')
export class educationController {
  constructor(private readonly educationService: educationService) {}

  // GET /education/:workerId
  @Get('worker/:workerId')
  @serialize(getEducationDto)
  async getEducations(
    @Param('workerId') workerId: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ): Promise<Education[]> {
    return this.educationService.getEducations(workerId , skip , take);
  }
  // GET /education/:workerId/:educationId
  @Get(':educationId')
  @serialize(getEducationDto)
  async getEducationById(
    @Param('educationId') experienceId: string,
  ): Promise<Education> {
    return this.educationService.getEducationById(experienceId);
  }

  // POST /education
  @Post()
  @serialize(getEducationDto)
  @UseGuards(AuthGuard, RoleGuard)
  @roles(UserType.WORKER)
  async createEducation(
    @user() user: userToken,
    @Body() addeducation: createEducationDto,
  ): Promise<Education> {
    const education = plainToClass(Education, addeducation);
    education.workerId = user.sub;
    return this.educationService.createEducation(education);
  }

  // PUT /experiences/:workerId/:experienceId
  @Put(':educationId')
  @serialize()
  @UseGuards(AuthGuard, RoleGuard)
  @roles(UserType.WORKER)
  async updateEducation(
    @user() user: userToken,
    @Param('educationId') educationId: string,
    @Body() updateEducation: updateEducationDto,
  ): Promise<string> {
    const education = plainToInstance(Education, updateEducation);
    return this.educationService.updateEducation(
      education,
      educationId,
      user.sub,
    );
  }
  @Delete(':educationId')
  @serialize()
  @UseGuards(AuthGuard, RoleGuard)
  @roles(UserType.WORKER)
  async deleteEducation(
    @user() user: userToken,
    @Param('educationId') educationId: string,
  ): Promise<string> {
    return this.educationService.deleteEducation(educationId, user.sub);
  }
}
