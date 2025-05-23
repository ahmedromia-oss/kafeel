import { Optional } from '@nestjs/common';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { education, ValidationErrors } from 'src/constants';

export class createExperienceDto {
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))

  @IsDate({ message: ValidationErrors.INVALID_DATE })
  startDate: Date;
  @IsOptional()
  @IsString()
  describtion: string;
  @IsOptional()
  @Transform(({ value }) => new Date(value))

  @IsDate({ message: ValidationErrors.INVALID_DATE })

  endDate: Date;
  @IsNotEmpty()
  @IsString()
  company: string;
  @IsString()
  @IsOptional()
  companyUrl: string;
  @IsString()
  @IsOptional()
  city: string;
  @IsString()
  @IsNotEmpty()
  country: string;
}
