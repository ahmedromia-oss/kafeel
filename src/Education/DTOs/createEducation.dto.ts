import { Optional } from '@nestjs/common';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { education, ValidationErrors } from 'src/constants';

export class createEducationDto {
  @IsNotEmpty()
  @IsDate({ message: ValidationErrors.INVALID_DATE })
  startDate: Date;
  @IsNotEmpty()
  @IsEnum(education, { message: ValidationErrors.INVALID_EDUCATION_ENUM })
  degree: education;

  @IsOptional()
  @IsString()
  describtion: string;
  @IsOptional()
  @IsDate({ message: ValidationErrors.INVALID_DATE })
  endDate: Date;
  @IsNotEmpty()
  @IsString()
  uniOrSchool: string;
  @IsString()
  @IsOptional()
  uniOrSchoolUrl: string;
  @IsString()
  @IsOptional()
  city: string;
  @IsString()
  @IsNotEmpty()
  country: string;
}
