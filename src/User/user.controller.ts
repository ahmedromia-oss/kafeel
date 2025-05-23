import { Body, Controller, Get, Param, Patch, Put } from '@nestjs/common';

import { serialize } from '../../Shared/Interceptors/Serialize.Interceptor';

import { UserService } from './user.service';

import { updateUserDto } from './DTOs/updateUserDto';

import { User } from './user.model';
import { plainToInstance } from 'class-transformer';
import { getUserDto } from './DTOs/getUserDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @serialize()
  @Put(':id')
  async update(@Body() data: updateUserDto, @Param('id') id: string) {
    const user = plainToInstance(User, data);

    const result = await this.userService.UpdateUser(user, id);
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
