import {
  Body,
  Controller,
  Post,
  Get,
  Headers,
  UseGuards,
  Put,
} from '@nestjs/common';

import { serialize } from '../../Shared/Interceptors/Serialize.Interceptor';
import { getUserDto } from 'src/User/DTOs/getUserDto';

import { getUserDtoWithToken } from 'src/User/DTOs/getUserWithToken.dto';
import { getPrivateUserDto } from 'src/User/DTOs/getPrivateUser.dto';
import { SignUpDTO } from 'src/Auth/DTOs/signup.dto';
import { AuthService } from 'src/Auth/auth.service';
import { SignInUserDTO } from 'src/Auth/DTOs/login.dto';
import { kafeelService } from './kafeel.service';
import { loginDto } from 'src/Auth/DTOs/loginOTP.dto';
import { CreatekafeelDto } from './DTOs/createKafeel.dto';
import { plainToClass } from 'class-transformer';
import { kafeel } from './kafeel.model';
import { AuthGuard } from 'src/Auth/Gaurds/auth.gaurd';
import { RoleGuard } from 'src/Auth/Gaurds/Role.gaurd';
import { roles } from 'src/Auth/Decorators/Roles.decorator';
import { UserType } from 'src/constants';
import { user } from 'src/User/Decorators/user.decorator';
import { userToken } from 'src/models/userToken.model';
import { UpdatekafeelDto } from './DTOs/updateKafeel.dto';

@Controller('kafeel')
export class KafeelController {
  constructor(private readonly kafeelService: kafeelService) {}
  @serialize()
  @UseGuards(AuthGuard, RoleGuard)
  @roles(UserType.KAFEEL)
  @Put('/create')
  async createKafeel(@user() user: userToken, @Body() dto: CreatekafeelDto) {
    const kafeelToUpdate = plainToClass(kafeel, dto);
    return await this.kafeelService.updateKafeel(user.sub, kafeelToUpdate);
  }

  @serialize()
  @UseGuards(AuthGuard, RoleGuard)
  @roles(UserType.KAFEEL)
  @Put('/update')
  async updateKafeel(@user() user: userToken, @Body() dto: UpdatekafeelDto) {
    const kafeelToUpdate = plainToClass(kafeel, dto);
    return this.kafeelService.updateKafeel(user.sub, kafeelToUpdate);
  }
}
