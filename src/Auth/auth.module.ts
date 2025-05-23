import { forwardRef, Module } from '@nestjs/common';


import { UserModule } from 'src/User/user.module';
import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
import { AuthService } from './auth.service';

import { RedisModule } from 'src/Redis/redis.module';
import { TokenModule } from 'src/JWT/jwt.module';



@Module({
  imports: [
    UserModule,
    RedisModule,
    TokenModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
