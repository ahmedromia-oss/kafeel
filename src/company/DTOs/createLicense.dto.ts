import { IsNotEmpty } from 'class-validator';
import { ValidationErrors } from 'src/constants';

export class createLicenseDto {
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  ownerName: string;
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  licenseNumber: string;
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  officeName: string;
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  ownerPhone: string;
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  ownerEmail: string;
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  officeCity: string;
}
