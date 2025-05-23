import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { AwardService } from './award.service';
import { Award } from './awards.model';
import { roles } from 'src/Auth/Decorators/Roles.decorator';
import { UserType } from 'src/constants';
import { AuthGuard } from 'src/Auth/Gaurds/auth.gaurd';
import { user } from 'src/User/Decorators/user.decorator';
import { userToken } from 'src/models/userToken.model';
import { serialize } from 'shared/Interceptors/Serialize.Interceptor';
import { GetAwardDto } from './DTOs/getAward.dto';
import { CreateAwardDto } from './DTOs/createAward.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateAwardDto } from './DTOs/updateAward.dto';

@Controller('awards')
export class AwardController {
  constructor(private readonly awardService: AwardService) {}

  @Get('worker/:workerId')
  @serialize(GetAwardDto)
  
  async getAwards(@Param('workerId') workerId: string): Promise<GetAwardDto[]> {
    return await this.awardService.getAwards(workerId);
  }

  @Get(':awardId')
  @serialize(GetAwardDto)
  async getAwardById(@Param('awardId') awardId: string): Promise<GetAwardDto> {
    return await this.awardService.getAwardById(awardId);
  }
  @UseGuards(AuthGuard)
  @roles(UserType.WORKER)
  @serialize(GetAwardDto)
  @Post()
  async createAward(
    @user() user: userToken,
    @Body() createAward: CreateAwardDto,
  ): Promise<Award> {
    const award = plainToInstance(Award, createAward);
    award.workerId = user.sub;
    
    return await this.awardService.createAward(award);
  }

  @UseGuards(AuthGuard)
  @Put(':awardId')
  @roles(UserType.WORKER)
  @serialize()
  async updateAward(
    @user() user: userToken,
    @Param('awardId') awardId: string,
    @Body() updateAward: UpdateAwardDto,
  ): Promise<string> {
    const award = plainToInstance(Award, updateAward);
    return await this.awardService.updateAward(award, awardId, user.sub);
  }
  @UseGuards(AuthGuard)
  @roles(UserType.WORKER)
  @Delete(':awardId')
  @serialize()
  async deleteAward(
    @user() user: userToken,
    @Param('awardId') awardId: string,
  ): Promise<string> {
    return await this.awardService.deleteAward(awardId, user.sub);
  }
}
