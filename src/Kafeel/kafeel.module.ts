import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { kafeel } from './kafeel.model';
import { kafeelService } from './kafeel.service';
import { KafeelRepository } from './kafeel.repository';



@Module({
  imports: [TypeOrmModule.forFeature([kafeel])],
  providers: [kafeelService , KafeelRepository],
  exports: [],
})
export class KafeelModule {}




