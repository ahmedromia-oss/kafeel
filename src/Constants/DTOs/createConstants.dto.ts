import { IsString, IsNotEmpty } from 'class-validator';
import { ValidationErrors } from 'src/constants';

export class CreateConstantsDto {
  @IsString({ message: ValidationErrors.MUST_STRING })
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  aboutEn: string;

  @IsString({ message: ValidationErrors.MUST_STRING })
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  aboutAr: string;

  @IsString({ message: ValidationErrors.MUST_STRING })
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  aboutBn: string;

  @IsString({ message: ValidationErrors.MUST_STRING })
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  aboutHi: string;

  @IsString({ message: ValidationErrors.MUST_STRING })
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  aboutUr: string;

  @IsString({ message: ValidationErrors.MUST_STRING })
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  privacyPolicyEn: string;

  @IsString({ message: ValidationErrors.MUST_STRING })
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  privacyPolicyAr: string;

  @IsString({ message: ValidationErrors.MUST_STRING })
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  privacyPolicyBn: string;

  @IsString({ message: ValidationErrors.MUST_STRING })
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  privacyPolicyHi: string;

  @IsString({ message: ValidationErrors.MUST_STRING })
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  privacyPolicyUr: string;
}

