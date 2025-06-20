import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Req,
  UseGuards,
  Put,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { companyService } from './company.service';

import { Company } from './company.model';
import { updateCompanyDto } from './DTOs/updateCompany.dto';
import { AuthGuard } from 'src/Auth/Gaurds/auth.gaurd';
import { RoleGuard } from 'src/Auth/Gaurds/Role.gaurd';
import { roles } from 'src/Auth/Decorators/Roles.decorator';
import { Code, FileType, PERMISSION, UserType } from 'src/constants';
import { plainToClass } from 'class-transformer';
import { userToken } from 'src/models/userToken.model';
import { user } from 'src/User/Decorators/user.decorator';
import { createLicenseDto } from './DTOs/createLicense.dto';
import { updateLicenseDto } from './DTOs/updateLicense.dto';
import { CreateCompanyDto } from './DTOs/createCompany.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { serialize } from 'shared/Interceptors/Serialize.Interceptor';
import { BucketsService } from 'src/Buckets/buckets.service';
import { getCompanyDto } from './DTOs/getCompany.dto';
import { permissions } from 'src/Auth/Decorators/permissions.decorator';
import { GetAdvertiseDto } from 'src/Advertise/DTOs/getAdvertise.dto';
@permissions(PERMISSION.IS_APPROVED)
@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyService: companyService,
    private readonly bucketService: BucketsService,
  ) {}

  @Put()
  @serialize()
  @UseGuards(AuthGuard, RoleGuard)
  @roles(UserType.COMPANY)
  async create(@user() user: userToken, @Body() dto: CreateCompanyDto) {
    // fallback if userId is passed in dto
    const company = plainToClass(Company, dto);
    return await this.companyService.updateCompany(user.sub, company);
  }
  @Put('update')
  @serialize()
  @UseGuards(AuthGuard, RoleGuard)
  @roles(UserType.COMPANY)
  async update(@user() user: userToken, @Body() dto: updateCompanyDto) {
    // fallback if userId is passed in dto
    const company = plainToClass(Company, dto);
    return await this.companyService.updateCompany(user.sub, company);
  }
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'licenseImage', maxCount: 1 },
      { name: 'idImage', maxCount: 1 },
    ]),
  )
  @Put('license')
  @serialize()
  @UseGuards(AuthGuard, RoleGuard)
  @roles(UserType.COMPANY)
  async createLicense(
    @UploadedFiles()
    files: {
      licenseImage: Express.Multer.File[];
      idImage: Express.Multer.File[];
    },
    @user() user: userToken,
    @Body() dto: createLicenseDto,
  ) {
    if (
      !files.idImage ||
      !files.licenseImage ||
      !files.idImage[0] ||
      !files.licenseImage[0]
    ) {
      throw new BadRequestException(Code.license_must_valid_files);
    }
    const company = plainToClass(Company, dto);

    company.idImage = this.bucketService.saveFile(
      files.idImage[0],
      FileType.CV,
    );
    company.licenseImage = this.bucketService.saveFile(
      files.licenseImage[0],
      FileType.CV,
    );

    return await this.companyService.updateCompany(user.sub, company);
  }
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'licenseImage', maxCount: 1 },
      { name: 'idImage', maxCount: 1 },
    ]),
  )
  @serialize()
  @Put('license/update')
  @UseGuards(AuthGuard, RoleGuard)
  @roles(UserType.COMPANY)
  async updateLicense(
    @UploadedFiles()
    files: {
      licenseImage: Express.Multer.File[];
      idImage: Express.Multer.File[];
    },
    @user() user: userToken,
    @Body() dto: updateLicenseDto,
  ) {
    // fallback if userId is passed in dto
    const company = plainToClass(Company, dto);
    if (files.idImage && files.idImage[0]) {
      company.idImage = this.bucketService.saveFile(
        files.idImage[0],
        FileType.CV,
      );
    }
    if (files.licenseImage && files.licenseImage[0]) {
      company.licenseImage = this.bucketService.saveFile(
        files.licenseImage[0],
        FileType.CV,
      );
    }
    return await this.companyService.updateCompany(user.sub, company);
  }
  @serialize()
  @Put('approveUser/:companyId')
  @UseGuards(AuthGuard)
  async approveCompany(@Param('companyId') companyId: string) {
    console.log(companyId)
    return await this.companyService.approveCompany(companyId);
  }

  @serialize(getCompanyDto)
  @Post('approveUser/:companyId')
  @UseGuards(AuthGuard)
  async unAppovedCompanies() {
    return await this.companyService.unApprovedUsers();
  }
  @serialize(GetAdvertiseDto)
  @Post('companyAddAdvertise')
  @UseGuards(AuthGuard)
  async addAdvertise() {
    return await this.companyService.unApprovedUsers();
  }
}
