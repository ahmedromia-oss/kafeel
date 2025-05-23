import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Experience } from './Experience.model';
import { experienceService } from './experience.service';
import { user } from 'src/User/Decorators/user.decorator';
import { userToken } from 'src/models/userToken.model';
import { AuthGuard } from 'src/Auth/Gaurds/auth.gaurd';
import { RoleGuard } from 'src/Auth/Gaurds/Role.gaurd';
import { roles } from 'src/Auth/Decorators/Roles.decorator';
import { UserType } from 'src/constants';
import { GetExperienceDto } from './DTOs/getExperience.dto';
import { createExperienceDto } from './DTOs/createExperience.dto';
import { serialize } from 'shared/Interceptors/Serialize.Interceptor';
import { plainToClass, plainToInstance } from 'class-transformer';
import { updateExperienceDto } from './DTOs/updateExperience.dto';

@Controller('experiences')
export class experienceController {
  constructor(private readonly experienceService: experienceService) {}

  // GET /experiences/:workerId
  @Get('worker/:workerId')
  @serialize(GetExperienceDto)
  async getExperiences(
    @Param('workerId') workerId: string,
  ): Promise<GetExperienceDto[]> {
    return this.experienceService.getexperiences(workerId);
  }

  // GET /experiences/:workerId/:experienceId
  @Get(':experienceId')
  @serialize(GetExperienceDto)
  async getExperienceById(
    @Param('experienceId') experienceId: string,
  ): Promise<GetExperienceDto> {
    return this.experienceService.getexperienceById(experienceId);
  }

  // POST /experiences
  @Post()
  @serialize(GetExperienceDto)
  @UseGuards(AuthGuard, RoleGuard)
  @roles(UserType.WORKER)
  async createExperience(
    @user() user: userToken,
    @Body() addexperience: createExperienceDto,
  ): Promise<GetExperienceDto> {
    const experience = plainToClass(Experience, addexperience);
    experience.workerId = user.sub;
    return this.experienceService.createExperience(experience);
  }

  // PUT /experiences/:workerId/:experienceId
  @Put(':experienceId')
  @serialize()
  @UseGuards(AuthGuard, RoleGuard)
  @roles(UserType.WORKER)
  async updateExperience(
    @user() user: userToken,
    @Param('experienceId') experienceId: string,
    @Body() updateExperience: updateExperienceDto,
  ): Promise<string> {
    const experience = plainToInstance(Experience, updateExperience);
    return this.experienceService.updateExperience(
      experience,
      experienceId,
      user.sub,
    );
  }
  @Delete(':experienceId')
  @serialize()
  @UseGuards(AuthGuard, RoleGuard)
  @roles(UserType.WORKER)
  async deleteExperience(
    @user() user: userToken,
    @Param('experienceId') experienceId: string,
  ): Promise<string> {

    return this.experienceService.deleteExperience(
      experienceId,
      user.sub,
    );
  }
}
