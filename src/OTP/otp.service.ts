import {
  BadRequestException,
  Injectable,
  NotFoundException,
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
import { createTransport } from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { customJwtService } from 'src/JWT/jwt.service';
import { userToken } from 'src/models/userToken.model';

@Injectable()
export class otpService {
  constructor(
    private readonly otpRepo: OtpRepository,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: customJwtService,
  ) {}
  async verifyEmailOtp(otp: string) {
    try {
      const otpUser = await this.otpRepo.findOne({
        where: {
          code: otp,
          expiresAt: MoreThan(new Date()),
          Provider: typesOfOTP.VERIFY,
        },
        relations: { user: true },
      });
      const payload: userToken = {
        sub: otpUser.user.id,
        verifyEmail: otpUser.user.emailVerified,
        verifyPhone: otpUser.user.phoneVerified,
        type: otpUser.user.userType,
        Approved: otpUser.user.userApproved,
      };
      return await this.jwtService.createToken(
        payload,
        this.configService.get<string>('secretKey'),
        this.configService.get<string>('durationToken'),
      );
    } catch(e) {
      throw new BadRequestException(Code.INVALID_OTP);
    }
  }
  async sendMailOtp(email: string) {
    const code = this.generateCode();
    try {
      const user = await this.userService.getUserByEmail(email);

      if (user.emailVerified == true) {
        await this.otpRepo.update(
          {
            userId: user.id,
          },
          {
            code: code,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
            Provider: typesOfOTP.VERIFY,
          },
        );
        await this.userService.UpdateUser(
          { emailVerified: true } as User,
          user.id,
        );
      } else {
        await this.otpRepo.create({
          user: user,
          userId: user.id,
          code: code,
          expiresAt: new Date(Date.now() + 5 * 60 * 1000),
          Provider: typesOfOTP.VERIFY,
        });
      }
      const transporter = createTransport({
        service: 'gmail',
        auth: {
          user: this.configService.get<string>('EmailUser'),
          pass: this.configService.get<string>('passwordEmail'), // Not your Google account password!
        },
      });

      const mailOptions = {
        from: this.configService.get<string>('EmailUser'),
        to: email,
        subject: 'verification code',
        text: `Kafeel account single-use code: ${code}`,
      };

      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          throw new NotFoundException();
        }
      });
      return valuesString.UPDATED;
    } catch (e) {
      throw new NotFoundException();
    }
  }
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
