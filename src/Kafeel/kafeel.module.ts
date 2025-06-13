import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { kafeel } from './kafeel.model';
import { kafeelService } from './kafeel.service';
import { KafeelRepository } from './kafeel.repository';
import { KafeelController } from './kafeel.controller';
import { TokenModule } from 'src/JWT/jwt.module';



@Module({
  imports: [TypeOrmModule.forFeature([kafeel]) , TokenModule],
  providers: [kafeelService , KafeelRepository],
  exports: [],
  controllers:[KafeelController]
})
export class KafeelModule {}




