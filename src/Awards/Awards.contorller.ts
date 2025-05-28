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
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { AwardService } from './award.service';
import { Award } from './awards.model';
import { roles } from 'src/Auth/Decorators/Roles.decorator';
import { FileType, UserType } from 'src/constants';
import { AuthGuard } from 'src/Auth/Gaurds/auth.gaurd';
import { user } from 'src/User/Decorators/user.decorator';
import { userToken } from 'src/models/userToken.model';
import { serialize } from 'shared/Interceptors/Serialize.Interceptor';
import { GetAwardDto } from './DTOs/getAward.dto';
import { CreateAwardDto } from './DTOs/createAward.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateAwardDto } from './DTOs/updateAward.dto';
import { BucketsService } from 'src/Buckets/buckets.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('awards')
export class AwardController {
  constructor(
    private readonly awardService: AwardService,
    private readonly bucketService: BucketsService,
  ) {}

  @Get('worker/:workerId')
  @serialize(GetAwardDto)
  async getAwards(
    @Param('workerId') workerId: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ): Promise<GetAwardDto[]> {
    return await this.awardService.getAwards(workerId, skip, take);
  }

  @Get(':awardId')
  @serialize(GetAwardDto)
  async getAwardById(@Param('awardId') awardId: string): Promise<GetAwardDto> {
    return await this.awardService.getAwardById(awardId);
  }
  @UseGuards(AuthGuard)
  @roles(UserType.WORKER)
  @serialize(GetAwardDto)
  @UseInterceptors(FileInterceptor('Certificate'))
  @Post()
  async createAward(
    @user() user: userToken,
    @Body() createAward: CreateAwardDto,
    @UploadedFile() Certificate?: Express.Multer.File,
  ): Promise<Award> {
    const award = plainToInstance(Award, createAward);
    if (Certificate) {
      award.certificateFileUrl = this.bucketService.saveFile(
        Certificate,
        FileType.CV,
      );
    }
    award.workerId = user.sub;

    return await this.awardService.createAward(award);
  }

  @UseGuards(AuthGuard)
  @Put(':awardId')
  @roles(UserType.WORKER)
  @serialize()
  @UseInterceptors(FileInterceptor('Certificate'))
  async updateAward(
    @user() user: userToken,
    @Param('awardId') awardId: string,
    @Body() updateAward: UpdateAwardDto,
    @UploadedFile() Certificate?: Express.Multer.File,
  ): Promise<string> {
    const award = plainToInstance(Award, updateAward);
    if (Certificate) {
      award.certificateFileUrl = this.bucketService.saveFile(
        Certificate,
        FileType.CV,
      );
    }
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
