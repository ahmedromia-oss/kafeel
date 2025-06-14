import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Company } from "./company.model";
import { companyRepository } from "./company.repository";
import { companyService } from "./company.service";
import { CompanyController } from "./company.controller";
import { BucketsModule } from "src/Buckets/buckets.module";
import { TokenModule } from "src/JWT/jwt.module";



@Module({
  imports: [TypeOrmModule.forFeature([Company]) ,BucketsModule , TokenModule],
  providers: [companyRepository , companyService],
  exports: [companyService],
  controllers:[CompanyController]
})
export class companyModule {}




