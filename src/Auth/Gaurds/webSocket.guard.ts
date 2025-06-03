import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Request } from 'express';
import { Server, Socket } from 'socket.io';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { customJwtService } from 'src/JWT/jwt.service';
import { tokenType } from 'src/constants';




@Injectable()
export class webSocketGaurd implements CanActivate {
  constructor(
    private configService:ConfigService,
    private jwtService:customJwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    const result = await this.jwtService.verifyToken(token , this.configService.get<string>('secretKey'))
    if (result.tokenType != tokenType.VALID) {
      throw new UnauthorizedException();
    }
    try {
      const allowAny = this.reflector.get<string[]>(
        'allow-any',
        context.getHandler(),
      );
      try {
        const payload = await this.jwtService.verifyToken(token, this.configService.get<string>('secretKey'))

      
        request['user'] = payload;
      } catch {
        if (allowAny) {
          return true;
        } else {
          throw new UnauthorizedException();
        }
      }

      return true;
    } catch {
      throw new UnauthorizedException()
    }
  }

  private extractTokenFromHeader(client: Socket): string | undefined {
    const token= client.handshake.auth?.token
    console.log("hello broooo")
    return token

  }
}