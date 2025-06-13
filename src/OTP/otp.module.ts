import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenModule } from 'src/JWT/jwt.module';
import { Otp } from './otp.model';
import { otpService } from './otp.service';
import { OtpRepository } from './otp.repository';
import { UserModule } from 'src/User/user.module';
import { OTPController } from './otp.controller';

@Module({
  imports: [TokenModule , TypeOrmModule.forFeature([Otp]) , UserModule],
  providers: [otpService , OtpRepository],
  exports: [otpService],
  controllers:[OTPController]
})
export class OTPModule {}




