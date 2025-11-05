import { IsString, IsOptional } from 'class-validator';
import { ValidationErrors } from 'src/constants';

export class UpdateConstantsDto {
  @IsOptional()
  @IsString({ message: ValidationErrors.MUST_STRING })
  aboutEn?: string;

  @IsOptional()
  @IsString({ message: ValidationErrors.MUST_STRING })
  aboutAr?: string;

  @IsOptional()
  @IsString({ message: ValidationErrors.MUST_STRING })
  aboutBn?: string;

  @IsOptional()
  @IsString({ message: ValidationErrors.MUST_STRING })
  aboutHi?: string;

  @IsOptional()
  @IsString({ message: ValidationErrors.MUST_STRING })
  aboutUr?: string;

  @IsOptional()
  @IsString({ message: ValidationErrors.MUST_STRING })
  privacyPolicyEn?: string;

  @IsOptional()
  @IsString({ message: ValidationErrors.MUST_STRING })
  privacyPolicyAr?: string;

  @IsOptional()
  @IsString({ message: ValidationErrors.MUST_STRING })
  privacyPolicyBn?: string;

  @IsOptional()
  @IsString({ message: ValidationErrors.MUST_STRING })
  privacyPolicyHi?: string;

  @IsOptional()
  @IsString({ message: ValidationErrors.MUST_STRING })
  privacyPolicyUr?: string;
}

