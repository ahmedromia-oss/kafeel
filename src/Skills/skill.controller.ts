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
import { SkillService } from './skill.service';
import { GetSkillDto } from './DTOs/getSKill.dto';
import { Skill } from './skills.model';
import { createSkillDto } from './DTOs/createSkill.dto';
import { updateSkillDto } from './DTOs/updateSkill.dto';

@Controller('skill')
export class skillController {
  constructor(private readonly skillService: SkillService) {}

  // GET /education/:workerId
  @Get('worker/:workerId')
  @serialize(GetSkillDto)
  async getSkills(
    @Param('workerId') workerId: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ): Promise<Skill[]> {
    return this.skillService.getAllSkills(workerId, skip, take);
  }
  // GET /skill/:workerId/:skillId
  @Get(':skillId')
  @serialize(GetSkillDto)
  async getSkillId(@Param('skillId') skillId: string): Promise<Skill> {
    return this.skillService.getSkillById(skillId);
  }

  // POST /skill
  @Post()
  @serialize(GetSkillDto)
  @UseGuards(AuthGuard, RoleGuard)
  @roles(UserType.WORKER)
  async createSkill(
    @user() user: userToken,
    @Body() addSkill: createSkillDto,
  ): Promise<Skill> {
    const skill = plainToClass(Skill, addSkill);
    skill.workerId = user.sub;
    return this.skillService.createSkill(skill);
  }

  // PUT /workId/:workerId/:skillId
  @Put(':skillId')
  @serialize()
  @UseGuards(AuthGuard, RoleGuard)
  @roles(UserType.WORKER)
  async updateSkill(
    @user() user: userToken,
    @Param('skillId') skillId: string,
    @Body() updateSkill: updateSkillDto,
  ): Promise<string> {
    const skill = plainToInstance(Skill, updateSkill);
    return this.skillService.updateSkill(skillId, user.sub, skill);
  }
  @Delete(':skillId')
  @serialize()
  @UseGuards(AuthGuard, RoleGuard)
  @roles(UserType.WORKER)
  async deleteSkill(
    @user() user: userToken,
    @Param('skillId') skillId: string,
  ): Promise<string> {
    return this.skillService.deleteSkill(skillId, user.sub);
  }
}
