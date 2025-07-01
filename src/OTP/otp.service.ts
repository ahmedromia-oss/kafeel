import {
  BadRequestException,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import axios from 'axios';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Code, tokenType, typesOfOTP, valuesString } from 'src/constants';
import { OtpRepository } from './otp.repository';
import { User } from 'src/User/models/user.model';
import { Otp } from './otp.model';
import { user } from 'src/User/Decorators/user.decorator';
import { UserService } from 'src/User/user.service';
import { MoreThan } from 'typeorm';
import { sendOTPDTO } from './DTOs/sendOTP.dto';

@Injectable()
export class otpService {
  constructor(
    private readonly otpRepo: OtpRepository,
    private readonly userService: UserService,
  ) {}
  async update(otp: Otp) {
    return await this.otpRepo.update({ id: otp.id }, otp);
  }
  async create(sendOTPDTO: sendOTPDTO) {
    const code = this.generateCode();
    try {
      const user = await this.userService.getByPhoneNumber(
        sendOTPDTO.phoneNumber,
      );

      await this.otpRepo.update(
        {
          userId: user.id,
        },
        {
          code: this.generateCode(),
          expiresAt: new Date(Date.now() + 5 * 60 * 1000),
          Provider: typesOfOTP.LOGUP,
        },
      );
      const url = `https://api.oursms.com/api-a/msgs?username=ABWAB-OTP&token=aKLk0Q3H8bPeUhMcvN2j&src=ABWAB-OTP&dests=${user.phoneNumber}&body=Kafeel account single-use code: ${code}&priority=0&delay=0&validity=0&maxParts=0&dlr=0&prevDups=0`;
      await axios.get(url);
      return valuesString.UPDATED;
    } catch {
      const res = await this.otpRepo.create({
        code: this.generateCode(),
        Provider: typesOfOTP.LOGUP,
      });
      const url = `https://api.oursms.com/api-a/msgs?username=ABWAB-OTP&token=aKLk0Q3H8bPeUhMcvN2j&src=ABWAB-OTP&dests=${sendOTPDTO.phoneNumber}&body=Kafeel account single-use code: ${res.code}&priority=0&delay=0&validity=0&maxParts=0&dlr=0&prevDups=0`;
      await axios.get(url);

      return valuesString.UPDATED;
    }
  }
  private generateCode(): string {
    const random = Math.floor(Math.random() * 1_000_000); // 0–999999
    return random.toString().padStart(6, '0'); // always 6 digits, padded with zeros if needed
  }
  async verfiyOtp(code: string): Promise<Otp> {
    const now = new Date();
    try {
      const otp = await this.otpRepo.findOne({
        where: {
          code: code,
          expiresAt: MoreThan(now),
          Provider: typesOfOTP.LOGUP,
        },
      });
      return otp;
    } catch {
      throw new BadRequestException(Code.INVALID_OTP);
    }
  }
}
