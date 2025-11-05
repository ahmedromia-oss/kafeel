import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Constants } from './constants.model';
import { ConstantsService } from './constants.service';
import { ConstantsRepository } from './constants.repository';
import { ConstantsController } from './constants.controller';
import { TokenModule } from 'src/JWT/jwt.module';

@Module({
  imports: [TypeOrmModule.forFeature([Constants]), TokenModule],
  providers: [ConstantsService, ConstantsRepository],
  exports: [ConstantsService],
  controllers: [ConstantsController],
})
export class ConstantsModule {}

