import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { serialize } from '../../Shared/Interceptors/Serialize.Interceptor';

import { UserService } from './user.service';

import { updateUserDto } from './DTOs/updateUserDto';

import { User } from './user.model';
import { plainToInstance } from 'class-transformer';

import { FileInterceptor } from '@nestjs/platform-express';

import { BucketsService } from 'src/Buckets/buckets.service';
import { FileType, UserType } from 'src/constants';
import { user } from './Decorators/user.decorator';
import { userToken } from 'src/models/userToken.model';
import { AuthGuard } from 'src/Auth/Gaurds/auth.gaurd';
import { getProfileDto } from './DTOs/getProfile.dto';

import { getProfileLockedDto } from './DTOs/getProfileLocked.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly bucketService: BucketsService,
  ) {}
  @UseGuards(AuthGuard)
  @serialize()
  @Put()
  @UseInterceptors(FileInterceptor('profilePhoto'))
  async update(
    @Body() data: updateUserDto,
    @user() userToUpdate: userToken,
    @UploadedFile() profilePhoto?: Express.Multer.File,
  ) {
    const user = plainToInstance(User, data);

    if (profilePhoto) {
      user.profilePhoto = this.bucketService.saveFile(
        profilePhoto,
        FileType.IMAGE,
      );
    }

    return await this.userService.UpdateUser(user, userToUpdate.sub);
  }

  @Get('/')
  async getAll() {
    return await this.userService.allUsers();
  }
  @Get('/user/:userId')
  @serialize(getProfileDto, [])
  async getProfile(@Param('userId') userId: string) {
    return await this.userService.getProfile(userId);
  }
  @UseGuards(AuthGuard)
  @Get('private/profile')
  @serialize(getProfileLockedDto, [])
  async getProfilePrivate(@user() user: userToken) {
    return await this.userService.getProfile(user.sub);
  }
}
