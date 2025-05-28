import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Company } from "./company.model";
import { companyRepository } from "./company.repository";
import { companyService } from "./company.service";



@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  providers: [companyRepository , companyService],
  exports: [companyService],
})
export class companyModule {}




