import {
  IsDate,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  NotContains,
} from 'class-validator';
import { ValidationErrors } from '../../constants';
import { Expose, Transform } from 'class-transformer';
import { Optional } from '@nestjs/common';
export class updateUserDto {
  @Optional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  nationalId:string
  @IsOptional()
  @Transform(({ value }) => {
    if (value) {
      return value.toLowerCase();
    }
  })
  @MaxLength(15, { message: ValidationErrors.STRING_OUT_OF_RANGE })
  @IsString({ message: ValidationErrors.MUST_STRING })
  @Transform(({ value }) => {
    if (value) {
      return value
        .trim()
        .split(/[\s,\t,\n]+/)
        .join(' ');
    }
  })
  @NotContains(' ', { message: ValidationErrors.UNVALID_SPACE })
  @Expose()

  firstName: string;

  @IsOptional()
  profilePhoto: Express.Multer.File;
  @Transform(({ value }) => {
    if (value) {
      return value
        .trim()
        .split(/[\s,\t,\n]+/)
        .join(' ');
    }
  })
  @MaxLength(15, { message: ValidationErrors.STRING_OUT_OF_RANGE })
  @IsString({ message: ValidationErrors.MUST_STRING })
  @Transform(({ value }) => {
    if (value) {
      return value.toLowerCase();
    }
  })
  @IsOptional()
  @NotContains(' ', { message: ValidationErrors.UNVALID_SPACE })
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
  @IsDate({ message: 'MUST_DATE' })
  birthDate: Date;

  
}
