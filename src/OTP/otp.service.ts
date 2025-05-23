import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { tokenType } from 'src/constants';

@Injectable()
export class customJwtService {
  constructor(private jwtService: customJwtService) {
    
  }
  
}
