import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience } from './Experience.model';
import { workerModule } from 'src/Worker/worker.module';
import { experienceRepository } from './Experience.repository';
import { experienceService } from './experience.service';
import { experienceController } from './experience.controller';
import { TokenModule } from 'src/JWT/jwt.module';

@Module({
  imports: [TypeOrmModule.forFeature([Experience]) , workerModule , TokenModule],
  providers: [experienceRepository, experienceService],
  exports: [],
  controllers:[experienceController]
})
export class ExperienceModule {}
