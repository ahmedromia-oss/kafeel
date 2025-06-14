import { IsNotEmpty } from 'class-validator';
import { ValidationErrors } from 'src/constants';

export class CreateCompanyDto {
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  companyName: string;

  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  officePhoneNumber: string;

  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  ownerEmail: string;

  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  websiteUrl: string;

  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  city: string;

  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  commercialRegistrationNumber: string;

  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  officeOwnerName: string;
}
