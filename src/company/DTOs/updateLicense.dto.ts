import { IsOptional } from 'class-validator';

export class updateLicenseDto {
  @IsOptional()
  ownerName: string;
  @IsOptional()
  licenseNumber: string;
  @IsOptional()
  officeName: string;
  @IsOptional()
  ownerPhone: string;
  @IsOptional()
  ownerEmail: string;
  @IsOptional()
  officeCity: string;
}
