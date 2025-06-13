import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { kafeel } from './kafeel.model';
import { kafeelService } from './kafeel.service';
import { KafeelRepository } from './kafeel.repository';
import { kafeelController } from './kafeel.controller';



@Module({
  imports: [TypeOrmModule.forFeature([kafeel])],
  providers: [kafeelService , KafeelRepository],
  exports: [],
  controllers:[kafeelController]
})
export class KafeelModule {}




