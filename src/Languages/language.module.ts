import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from './languages.model';
import { LanguageService } from './language.service';
import { languageRepository } from './language.repository';
import { workerModule } from 'src/Worker/worker.module';
import { languageController } from './language.controller';
import { TokenModule } from 'src/JWT/jwt.module';




@Module({
  imports: [TypeOrmModule.forFeature([Language]) , workerModule , TokenModule],
  providers: [LanguageService , languageRepository],
  exports: [],
  controllers:[languageController]
})
export class LanguageModule {}




