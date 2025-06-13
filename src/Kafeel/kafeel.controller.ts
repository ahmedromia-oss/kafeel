import { Body, Controller, Post , Get  , Headers} from '@nestjs/common';

import { serialize } from '../../Shared/Interceptors/Serialize.Interceptor';
import { getUserDto } from 'src/User/DTOs/getUserDto';

import { getUserDtoWithToken } from 'src/User/DTOs/getUserWithToken.dto';
import { getPrivateUserDto } from 'src/User/DTOs/getPrivateUser.dto';
import { SignUpDTO } from 'src/Auth/DTOs/signup.dto';
import { AuthService } from 'src/Auth/auth.service';
import { SignInUserDTO } from 'src/Auth/DTOs/login.dto';
import { kafeelService } from './kafeel.service';
import { loginDto } from 'src/Auth/DTOs/loginOTP.dto';


@Controller('auth')
export class kafeelController {
    constructor(private kafeelService:kafeelService ){}
 
  
}
 
