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
import { getUserDto } from './DTOs/getUserDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { BucketsService } from 'src/Buckets/buckets.service';
import { FileType } from 'src/constants';
import { user } from './Decorators/user.decorator';
import { userToken } from 'src/models/userToken.model';
import { AuthGuard } from 'src/Auth/Gaurds/auth.gaurd';

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
    console.log(userToUpdate)
    const result = await this.userService.UpdateUser(user, userToUpdate.sub);
    return result;
  }
  @serialize(getUserDto)
  @Get(':id')
  async getById(@Param('id') id: string) {
    const result = await this.userService.getUserById(id);
    return result;
  }
  @serialize(getUserDto)
  @Get('/')
  async getAll() {
    const result = await this.userService.allUsers();
    return result;
  }
}
