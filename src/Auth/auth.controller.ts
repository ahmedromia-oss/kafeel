import {
  Body,
  Controller,
  Post,
  Get,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './DTOs/SignUp.dto';
import { serialize } from '../../Shared/Interceptors/Serialize.Interceptor';
import { getUserDto } from 'src/User/DTOs/getUserDto';
import { SignInUserDTO } from './DTOs/login.dto';
import { getUserDtoWithToken } from 'src/User/DTOs/getUserWithToken.dto';
import { getPrivateUserDto } from 'src/User/DTOs/getPrivateUser.dto';
import { loginDto } from './DTOs/loginOTP.dto';
import { resetPassword } from './DTOs/resetPassword.dto';
import { user } from 'src/User/Decorators/user.decorator';
import { userToken } from 'src/models/userToken.model';
import { AuthGuard } from './Gaurds/auth.gaurd';
import { forgetPasswordDto } from './DTOs/forgetPassword.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @serialize(getPrivateUserDto)
  @Post('signup')
  async SignUp(@Body() signUpDTO: SignUpDTO) {
    const result = await this.authService.signUp(signUpDTO);
    return result;
  }
  @serialize(getUserDtoWithToken)
  @Post('signin')
  async Signin(@Body() signInUserDTO: SignInUserDTO) {
    const result = await this.authService.logIn(signInUserDTO);
    return result;
  }
  @serialize()
  @Post('verify')
  async verify(@Headers() headers: Record<string, string>) {
    return await this.authService.verifyToken(
      headers['refreshtoken'],
      headers['authorization'],
    );
  }
  @serialize(getUserDtoWithToken)
  @Post('signOTP')
  async SigninOTP(@Body() loginDto: loginDto) {
    const result = await this.authService.loginForOtp(loginDto);
    return result;
  }
  @serialize()
  @Post('resetPassword')
  @UseGuards(AuthGuard)
  async resetPassword(
    @Body() resetPassword: resetPassword,
    @user() user: userToken,
  ) {
    return await this.authService.resetPassword(user.sub, resetPassword);
  }
  @serialize()
  @UseGuards(AuthGuard)
  @Post('forget-password')
  async forgetPassword(@Body() forgetPasswordDto: forgetPasswordDto , @user() user:userToken) {
    return await this.authService.forgetPassword(forgetPasswordDto , user.sub);
  }

 
}
