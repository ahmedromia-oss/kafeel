import { Body, Controller, Post } from '@nestjs/common';
import { IsPhoneNumber } from 'class-validator';
import { otpService } from './otp.service';
import { serialize } from 'shared/Interceptors/Serialize.Interceptor';
import { sendOTPDTO } from './DTOs/sendOTP.dto';
import { user } from 'src/User/Decorators/user.decorator';

@Controller('otp')
export class OTPController {
  constructor(private otpService: otpService) {}
  @serialize()
  @Post('/')
  async send(@Body() sendOTPDTO: sendOTPDTO) {
    const res = await this.otpService.create(sendOTPDTO);
    return res;
  }
  @serialize()
  @Post('/mail')
  async sendMail(@Body() { email }) {
    console.log(email);
    return await this.otpService.sendMailOtp(email);
  }
  @Post('verfiy/mail')
  @serialize()
  async verifyOtpEmail(@Body() { otp }) {
    return await this.otpService.verifyEmailOtp(otp);
  }
}
