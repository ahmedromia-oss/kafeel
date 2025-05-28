import {
  IsDate,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  NotContains,
} from 'class-validator';
import { ValidationErrors } from '../../constants';
import { Expose, Transform } from 'class-transformer';
import { Optional } from '@nestjs/common';
export class updateUserDto {
  @IsString({ message: ValidationErrors.MUST_STRING })
  @MinLength(5)
  @MaxLength(20)
  @IsOptional()
  nationalId: string;
  @IsOptional()
  @Transform(({ value }) => {
    if (value) {
      return value?.toLowerCase();
    }
  })
  @MaxLength(15, { message: ValidationErrors.STRING_OUT_OF_RANGE })
  @IsString({ message: ValidationErrors.MUST_STRING })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: ValidationErrors.NO_SPACE_NO_SPECIAL_CHRACHTER,
  })
  firstName: string;

  @Transform(({ value }) => {
    if (value) {
      return value?.toLowerCase();
    }
  })
  @IsOptional()
  @MaxLength(15, { message: ValidationErrors.STRING_OUT_OF_RANGE })
  @IsString({ message: ValidationErrors.MUST_STRING })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: ValidationErrors.NO_SPACE_NO_SPECIAL_CHRACHTER,
  })
  lastName: string;

  @MaxLength(20, { message: ValidationErrors.STRING_OUT_OF_RANGE })
  @IsString({ message: ValidationErrors.MUST_STRING })
  @IsOptional()
  phoneNumber: string;

  @IsOptional()
  @MaxLength(50, { message: ValidationErrors.STRING_OUT_OF_RANGE })
  @IsString({ message: ValidationErrors.MUST_STRING })
  country: string;

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: ValidationErrors.INVALID_DATE })
  birthDate: Date;
}
