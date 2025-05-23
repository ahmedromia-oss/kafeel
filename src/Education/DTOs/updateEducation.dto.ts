import { Optional } from '@nestjs/common';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { education, ValidationErrors } from 'src/constants';

export class updateEducationDto {
  @IsOptional()
  @IsDate({ message: ValidationErrors.INVALID_DATE })
  startDate: Date;
  @IsOptional()
  @IsEnum(education, { message: ValidationErrors.INVALID_EDUCATION_ENUM })
  degree: education;

  @IsOptional()
  @IsString()
  describtion: string;
  @IsOptional()
  @IsDate({ message: ValidationErrors.INVALID_DATE })
  endDate: Date;
  @IsOptional()
  @IsString()
  uniOrSchool: string;
  @IsString()
  @IsOptional()
  uniOrSchoolUrl: string;
  @IsString()
  @IsOptional()
  city: string;
  @IsString()
  @IsOptional()
  country: string;
}
