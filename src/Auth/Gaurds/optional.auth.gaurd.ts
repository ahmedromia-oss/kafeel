import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Request } from 'express';

import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { customJwtService } from 'src/JWT/jwt.service';
import { tokenType } from 'src/constants';

@Injectable()
export class OptionalAuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private jwtService: customJwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    const result = await this.jwtService.verifyToken(
      token,
      this.configService.get<string>('secretKey'),
    );
    try {
      const allowAny = this.reflector.get<string[]>(
        'allow-any',
        context.getHandler(),
      );
      try {
        const payload = await this.jwtService.verifyToken(
          token,
          this.configService.get<string>('secretKey'),
        );

        request['user'] = payload;
      } catch {
        return true;
      }

      return true;
    } catch {
      return true;
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const token = request.headers.authorization;
    return token;
  }
}
