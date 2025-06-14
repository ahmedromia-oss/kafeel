import { IsNotEmpty, IsOptional } from 'class-validator';
import { ValidationErrors } from 'src/constants';

export class updateCompanyDto {
  @IsOptional()
  companyName: string;

  @IsOptional()
  officePhoneNumber: string;

  @IsOptional()
  ownerEmail: string;

  @IsOptional()
  websiteUrl: string;

  @IsOptional()
  city: string;

  @IsOptional()
  commercialRegistrationNumber: string;

  @IsOptional()
  officeOwnerName: string;
}
