import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { tokenType } from 'src/constants';

@Injectable()
export class customJwtService {
  constructor(private jwtService: JwtService) {}
  async createToken(
    payload: any,
    secretKey: string,
    expires: string,
  ): Promise<string> {
    const token = await this.jwtService.signAsync(payload, {
      secret: secretKey,
      expiresIn: expires,
    });
    return token;
  }
  async verifyToken(
    token: string,
    secret: string,
  ): Promise<{ data: any; tokenType: tokenType }> {
    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: secret,
      });
      return { data: decoded, tokenType: tokenType.VALID };
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        return { data: this.jwtService.decode(token), tokenType: tokenType.EXPIRED };
      } else {
        return { data: null, tokenType: tokenType.NOTVALID };
      }
    }
  }
}
