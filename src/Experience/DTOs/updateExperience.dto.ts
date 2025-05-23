import { Optional } from '@nestjs/common';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { education, ValidationErrors } from 'src/constants';

export class updateExperienceDto {
  @IsOptional()
  @IsDate({ message: ValidationErrors.INVALID_DATE })
  startDate: Date;
  @IsOptional()
  @IsString()
  describtion: string;
  @IsOptional()
  @IsDate({ message: ValidationErrors.INVALID_DATE })
  endDate: Date;
  @IsOptional()
  @IsString()
  company: string;
  @IsString()
  @IsOptional()
  companyUrl: string;
  @IsString()
  @IsOptional()
  city: string;
  @IsString()
  @IsOptional()
  country: string;
}
