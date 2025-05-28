import { Module } from '@nestjs/common';
import { BucketsService } from './buckets.service';


@Module({
  controllers: [],
  providers: [BucketsService],
  exports: [BucketsService], // export if you want to use it elsewhere
})
export class BucketsModule {}
