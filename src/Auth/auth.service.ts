import {
  BadRequestException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInUserDTO } from './DTOs/login.dto';
import { UserService } from 'src/User/user.service';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/User/models/user.model';
import { SignUpDTO } from './DTOs/signup.dto';
import {
  Code,
  tokenType,
  typesOfOTP,
  UserType,
  ValidationErrors,
} from 'src/constants';
import { randomBytes, scrypt as _scrypt, verify } from 'crypto';
import { promisify } from 'util';
import { customJwtService } from 'src/JWT/jwt.service';
import { ConfigService } from '@nestjs/config';
import { userToken } from 'src/models/userToken.model';
import { loginDto } from './DTOs/loginOTP.dto';
import { otpService } from 'src/OTP/otp.service';
import { resetPassword } from './DTOs/resetPassword.dto';
import { forgetPasswordDto } from './DTOs/forgetPassword.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: customJwtService,
    private readonly userService: UserService,
    private readonly otpService: otpService,

    private readonly configService: ConfigService,
  ) {}

  async signUp(data: SignUpDTO, phoneVerified: boolean = false) {
    if (!(await this.userService.IsEmailUnique(data.email))) {
      throw new BadRequestException(Code.EMAIL_USED);
    }
    if (!(await this.userService.IsPhoneUnique(data.phoneNumber))) {
      throw new BadRequestException(Code.PHONENUMBER_USED);
    }
    const hashedPass = await this.hashSaltPassword(data.password);
    data.password = hashedPass;
    const user = plainToInstance(User, data);
    if (user.userType == UserType.COMPANY) {
      user.userApproved = false;
    }
    user.phoneVerified = phoneVerified;
    return await this.userService.createUser(user);
  }
  async verifyToken(
    refreshToken: string,
    accessToken: string,
  ): Promise<string> {
    const refreshData = await this.jwtService.verifyToken(
      refreshToken,
      this.configService.get<string>('refreshTokenKey'),
    );
    const AccessData = await this.jwtService.verifyToken(
      accessToken,
      this.configService.get<string>('secretKey'),
    );

    if (
      refreshData.tokenType == tokenType.VALID &&
      (AccessData.tokenType == tokenType.EXPIRED ||
        AccessData.tokenType == tokenType.VALID) &&
      AccessData.data?.sub == refreshData.data?.sub
    ) {
      const payload: userToken = {
        Approved: refreshData.data.Approved,
        sub: refreshData.data.sub,
        verifyEmail: refreshData.data.verifyEmail,
        verifyPhone: refreshData.data.verifyPhone,
        type: refreshData.data.type,
        isAdmin: refreshData.data.isAdmin,
      };
      return await this.jwtService.createToken(
        payload,
        this.configService.get<string>('secretKey'),
        this.configService.get<string>('durationToken'),
      );
    }
    throw new UnauthorizedException(Code.UN_AUTORIZED);
  }
  private async hashSaltPassword(password: string): Promise<string> {
    const scrypt = promisify(_scrypt);
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    return result;
  }

  async logIn(data: SignInUserDTO) {
    const user = await this.userService.getUserByEmail(data.email);

    if (user) {
      const scrypt = promisify(_scrypt);
      const [salt, Storedhash] = user.password.split('.');
      const hash = (await scrypt(data.password, salt, 32)) as Buffer;
      if (Storedhash != hash.toString('hex')) {
        throw new BadRequestException(Code.WRONG_CREDS);
      }
      const payload: userToken = {
        Approved: user.userApproved,
        sub: user.id,
        verifyEmail: user.emailVerified,
        verifyPhone: user.phoneVerified,
        type: user.userType,
        isAdmin: user.isAdmin,
      };

      return {
        refreshToken: await this.jwtService.createToken(
          payload,
          this.configService.get<string>('refreshTokenKey'),
          this.configService.get<string>('RefreshdurationToken'),
        ),
        Accesstoken: await this.jwtService.createToken(
          payload,
          this.configService.get<string>('secretKey'),
          this.configService.get<string>('durationToken'),
        ),
        ...user,
      };
    }
    throw new BadRequestException(Code.WRONG_CREDS);
  }

  async loginForOtp(loginDto: loginDto) {
    const otp = await this.otpService.verfiyOtp(
      loginDto.OTPcode,
      typesOfOTP.LOGUP,
    );

    try {
      const user = await this.userService.getByPhoneNumber(
        loginDto.phoneNumber,
      );
      if (otp.userId != user.id || otp.user?.userType != loginDto.userType) {
        throw new BadRequestException(Code.INVALID_OTP);
      }

      const payload: userToken = {
        Approved: user.userApproved,
        sub: user.id,
        verifyEmail: user.emailVerified,
        verifyPhone: user.phoneVerified,
        type: user.userType,
        isAdmin: user.isAdmin,
      };

      return {
        refreshToken: await this.jwtService.createToken(
          payload,
          this.configService.get<string>('refreshTokenKey'),
          this.configService.get<string>('RefreshdurationToken'),
        ),
        Accesstoken: await this.jwtService.createToken(
          payload,
          this.configService.get<string>('secretKey'),
          this.configService.get<string>('durationToken'),
        ),
        ...user,
      };
    } catch (e) {
      if (e instanceof NotFoundException) {
        if (loginDto.userType == UserType.WORKER) {
          throw new BadRequestException(Code.INVALID_OTP);
        }
        const user = plainToInstance(User, {
          password: this.generateStrongPassword(),
          userType: loginDto.userType,
          phoneNumber: loginDto.phoneNumber,
        } as SignUpDTO);
        const userCreated = await this.signUp(user, true);
        otp.user = userCreated;
        await this.otpService.update(otp);

        const payload: userToken = {
          Approved: userCreated.userApproved,
          sub: userCreated.id,
          verifyEmail: userCreated.emailVerified,
          verifyPhone: userCreated.phoneVerified,
          type: userCreated.userType,
          isAdmin: user.isAdmin,
        };

        return {
          refreshToken: await this.jwtService.createToken(
            payload,
            this.configService.get<string>('refreshTokenKey'),
            this.configService.get<string>('RefreshdurationToken'),
          ),
          Accesstoken: await this.jwtService.createToken(
            payload,
            this.configService.get<string>('secretKey'),
            this.configService.get<string>('durationToken'),
          ),

          ...userCreated,
        };
      } else {
        throw e;
      }
    }
  }
  async resetPassword(
    userId: string,
    { oldPassword, newPassword }: resetPassword,
  ) {
    const user = await this.userService.getUserById(userId);
    const scrypt = promisify(_scrypt);
    const [salt, Storedhash] = user.password.split('.');
    const hash = (await scrypt(oldPassword, salt, 32)) as Buffer;
    if (Storedhash != hash.toString('hex')) {
      throw new BadRequestException(Code.WRONG_CREDS);
    }
    const hashedPass = await this.hashSaltPassword(newPassword);
    return await this.userService.UpdateUser(
      { ...user, password: hashedPass } as User,
      user.id,
    );
  }
  private generateStrongPassword(length: number = 12): string {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    const allChars = uppercase + lowercase + numbers + symbols;

    let password = '';
    password += this.randomChar(uppercase);
    password += this.randomChar(lowercase);
    password += this.randomChar(numbers);
    password += this.randomChar(symbols);

    for (let i = 4; i < length; i++) {
      password += this.randomChar(allChars);
    }

    return this.shuffle(password);
  }

  private randomChar(str: string): string {
    return str[Math.floor(Math.random() * str.length)];
  }

  private shuffle(str: string): string {
    return str
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
  }
  async forgetPassword({
    newPassword,
    phoneNumber,
    OTPcode,
  }: forgetPasswordDto) {
    const user = await this.userService.getByPhoneNumber(phoneNumber);
    if (!user.phoneVerified) {
      throw new UnauthorizedException();
    }
    await this.otpService.verfiyOtp(OTPcode, typesOfOTP.RESETPASSWORD);
    const hashedPass = await this.hashSaltPassword(newPassword);
    return await this.userService.UpdateUser(
      { ...user, password: hashedPass } as User,
      user.id,
    );
  }
  async verfiy(phoneNumber: string, OTPcode:string) {
    const user = await this.userService.getByPhoneNumber(phoneNumber);
    await this.otpService.verfiyOtp(OTPcode, typesOfOTP.VERIFY);
    return await this.userService.UpdateUser(
      { ...user, phoneVerified: true } as User,
      user.id,
    );
  }
}
