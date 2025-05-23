import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { customJwtService } from './jwt.service';

@Module({
  imports: [],
  providers: [customJwtService],
  exports: [customJwtService],
})
export class TokenModule {}




