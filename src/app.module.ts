import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './dataSource';
import { AuthModule } from './Auth/auth.module';
import { UserModule } from './User/user.module';
import { SharedModule } from './UnitOfWork/unitOfWork.module';
import { TokenModule } from './JWT/jwt.module';
import { User } from './User/user.model';
import { Award } from './Awards/awards.model';

import { Education } from './Education/education.model';
import { Language } from './Languages/languages.model';
import { Skill } from './Skills/skills.model';
import { Worker } from './Worker/worker.model';
import { LanguageModule } from './Languages/language.module';
import { SkillModule } from './Skills/skill.module';
import { ExperienceModule } from './Experience/Experience.module';
import { EducationModule } from './Education/education.module';
import { AwardModule } from './Awards/awards.module';
import { AdvertiseModule } from './Advertise/advertise.module';
import { config } from 'process';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { BucketsModule } from './Buckets/buckets.module';
import { SocketModule } from './Socket/socket.module';
import { companyModule } from './company/company.module';
import { JobModule } from './Job/Job.module';
import { JobApplicants } from './Job_Applicants/Job_applicants.model';
import { JobApplicantsModule } from './Job_Applicants/Job_applicants.module';

@Module({
  imports: [
    AdvertiseModule,
    JwtModule.register({ global: true }),
    AuthModule,
    UserModule,
JobModule,
    TypeOrmModule.forRoot({ ...AppDataSource.options, autoLoadEntities: true }),
    SharedModule,
    TokenModule,
    LanguageModule,
    SkillModule,
    ExperienceModule,
    EducationModule,
    AwardModule,
    SocketModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JobApplicantsModule,
    BucketsModule,
    companyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
