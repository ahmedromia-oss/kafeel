import { Optional } from '@nestjs/common';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { education, ValidationErrors } from 'src/constants';

export class createExperienceDto {
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  @IsString({ message: ValidationErrors.MUST_STRING })
  jobTitle: string;
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: ValidationErrors.INVALID_DATE })
  startDate: Date;
  @IsOptional()
  @IsString({ message: ValidationErrors.MUST_STRING })
  describtion: string;
  @IsOptional()
  @Transform(({ value }) => {
    if (value) {
      return new Date(value);
    }
  })
  @IsDate({ message: ValidationErrors.INVALID_DATE })
  endDate: Date;
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  @IsString({ message: ValidationErrors.MUST_STRING })
  company: string;
  @IsString({ message: ValidationErrors.MUST_STRING })
  @IsUrl({}, { message: ValidationErrors.MUST_URL })
  @IsOptional()
  companyUrl: string;
  @IsString({ message: ValidationErrors.MUST_STRING })
  @IsOptional()
  city: string;
  @IsString({ message: ValidationErrors.MUST_STRING })
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  country: string;
}
