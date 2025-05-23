import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenModule } from 'src/JWT/jwt.module';

@Module({
  imports: [TokenModule],
  providers: [],
  exports: [],
})
export class OTPModule {}




