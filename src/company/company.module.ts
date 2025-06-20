import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Company } from "./company.model";
import { companyRepository } from "./company.repository";
import { companyService } from "./company.service";
import { CompanyController } from "./company.controller";
import { BucketsModule } from "src/Buckets/buckets.module";
import { TokenModule } from "src/JWT/jwt.module";
import { UserModule } from "src/User/user.module";
import { User } from "src/User/models/user.model";



@Module({
  imports: [TypeOrmModule.forFeature([Company]) ,BucketsModule , TokenModule ,forwardRef(() => UserModule) ],
  providers: [companyRepository , companyService],
  exports: [companyService],
  controllers:[CompanyController]
})
export class companyModule {}




