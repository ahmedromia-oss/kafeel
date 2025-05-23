import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { kafeel } from './kafeel.model';



@Module({
  imports: [TypeOrmModule.forFeature([kafeel])],
  providers: [],
  exports: [],
})
export class KafeelModule {}




