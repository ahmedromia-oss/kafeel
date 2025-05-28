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

export class updateEducationDto {
  @IsOptional()
  @IsDate({ message: ValidationErrors.INVALID_DATE })
  @Transform(({ value }) => new Date(value))
  startDate: Date;
  @IsOptional()
  @IsEnum(education, { message: ValidationErrors.INVALID_EDUCATION_ENUM })
  degree: education;

  @IsOptional()
  @IsString({ message: ValidationErrors.MUST_STRING })
  describtion: string;
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: ValidationErrors.INVALID_DATE })
  endDate: Date;
  @IsOptional()
  @IsString({ message: ValidationErrors.MUST_STRING })
  uniOrSchool: string;
  @IsString({ message: ValidationErrors.MUST_STRING })
  @IsOptional()
  @IsUrl({}, { message: ValidationErrors.MUST_URL })
  uniOrSchoolUrl: string;
  @IsString({ message: ValidationErrors.MUST_STRING })
  @IsOptional()
  city: string;
  @IsString({ message: ValidationErrors.MUST_STRING })
  @IsOptional()
  country: string;
}
