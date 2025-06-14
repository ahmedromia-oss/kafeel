import { Expose, Transform, Type } from 'class-transformer';
import { getUserDto } from 'src/User/DTOs/getUserDto';

export class getCompanyDto {
  @Expose()
  @Transform(({ value }) => value?.length ?? 0)
  Jobs: number;
  @Expose()
  @Type(() => getUserDto)
  user: getUserDto;
  @Expose()
  companyName: string;

  @Expose()
  officePhoneNumber: string;

  @Expose()
  officialEmail: string;

  @Expose()
  websiteUrl: string;

  @Expose()
  officeCity: string;

  @Expose()
  commercialRegistrationNumber: string;

  @Expose()
  ownerName: string;

  @Expose()
  officeOwnerName: string;

  @Expose()
  licenseNumber: string;

  @Expose()
  officeName: string;

  @Expose()
  ownerPhone: string;

  @Expose()
  ownerEmail: string;

  @Expose()
  city: string;

  @Expose()
  licenseImage: string; // URL or file path to license image

  @Expose()
  idImage: string;
}
