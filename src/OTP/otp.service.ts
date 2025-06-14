import {
  BadRequestException,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Code, tokenType } from 'src/constants';
import { OtpRepository } from './otp.repository';
import { User } from 'src/User/user.model';
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
    try {
      const user = await this.userService.getByPhoneNumber(
        sendOTPDTO.phoneNumber,
      );

      await this.otpRepo.update(
        {
          userId: user.id,
        },
        {
          code: "000000",
          expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        },
      );
      return await this.otpRepo.findOne({ where: { userId: user.id } });
    } catch {
      return await this.otpRepo.create({ code: "000000" });
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
        where: { code: code, expiresAt: MoreThan(now) },
      });
      return otp;
    } catch  {
      throw new BadRequestException(Code.INVALID_OTP);
    }
  }
}
