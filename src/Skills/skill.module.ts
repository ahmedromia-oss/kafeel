import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './skills.model';
import { SkillService } from './skill.service';
import { skillRepository } from './skill.repository';
import { workerModule } from 'src/Worker/worker.module';
import { skillController } from './skill.controller';
import { TokenModule } from 'src/JWT/jwt.module';

@Module({
  imports: [TypeOrmModule.forFeature([Skill]) , workerModule , TokenModule],
  providers: [SkillService , skillRepository],
  exports: [],
  controllers:[skillController]
})
export class SkillModule {}




