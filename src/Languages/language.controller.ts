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
import { LanguageService } from './language.service';
import { GetLanguageDto } from './DTOs/getLanguage.dto';
import { Language } from './languages.model';
import { CreateLanguageDto } from './DTOs/addLanguage.dto';
import { UpdateLanguageDto } from './DTOs/updateLanguage.dto';

@Controller('language')
export class languageController {
  constructor(private readonly languageService: LanguageService) {}

  // GET /education/:workerId
  @Get('worker/:workerId')
  @serialize(GetLanguageDto)
  async getLanguages(
    @Param('workerId') workerId: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ): Promise<Language[]> {
    return this.languageService.getLanguages(workerId , skip , take);
  }
  // GET /Language/:WorkerId/:LanguageId
  @Get(':langaugeId')
  @serialize(GetLanguageDto)
  async getLanguageById(
    @Param('langaugeId') languageId: string,
  ): Promise<Language> {
    return this.languageService.getLanguageById(languageId);
  }

  // POST /Language
  @Post()
  @serialize(GetLanguageDto)
  @UseGuards(AuthGuard, RoleGuard)
  @roles(UserType.WORKER)
  async createLanguage(
    @user() user: userToken,
    @Body() addlanguage: CreateLanguageDto,
  ): Promise<Language> {
    const language = plainToClass(Language, addlanguage);
    language.workerId = user.sub;
    return this.languageService.createLanguage(language);
  }

  // PUT /experiences/:workerId/:experienceId
  @Put(':languageId')
  @serialize()
  @UseGuards(AuthGuard, RoleGuard)
  @roles(UserType.WORKER)
  async updateLanguage(
    @user() user: userToken,
    @Param('languageId') languageId: string,
    @Body() updateLanguage: UpdateLanguageDto,
  ): Promise<string> {
    const language = plainToInstance(Language, updateLanguage);
    return this.languageService.updateLanguage(language, languageId, user.sub);
  }
  @Delete(':languageId')
  @serialize()
  @UseGuards(AuthGuard, RoleGuard)
  @roles(UserType.WORKER)
  async deleteLanguage(
    @user() user: userToken,
    @Param('languageId') languageId: string,
  ): Promise<string> {
    return this.languageService.deleteLanguage(languageId, user.sub);
  }
}
