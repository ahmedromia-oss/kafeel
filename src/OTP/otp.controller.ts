import { Body, Controller, Post } from '@nestjs/common';
import { IsPhoneNumber } from 'class-validator';
import { otpService } from './otp.service';
import { serialize } from 'shared/Interceptors/Serialize.Interceptor';
import { sendOTPDTO } from './DTOs/sendOTP.dto';

@Controller('otp')
export class OTPController {
  constructor(private otpService: otpService) {}
  @serialize()
  @Post('/')
  async send(@Body() sendOTPDTO:sendOTPDTO) {
    return await this.otpService.create(sendOTPDTO);
  }
}
