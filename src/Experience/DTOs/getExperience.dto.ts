import { Optional } from '@nestjs/common';
import { Expose, Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { education, ValidationErrors, valuesString } from 'src/constants';

export class GetExperienceDto {
  @Expose()
  jobTitle:string
  @Expose()
  id:string
  @Expose()
  startDate: Date;
  @Expose()
  describtion: string;
  @Expose()
  @Transform(({ value }) => {
    if (value === null || value === undefined) {
      return valuesString.PRESENT;
    }
    else{
      return value
    }
  })
  endDate: Date;

  @Expose()
  company: string;
  @Expose()
  companyUrl: string;

  @Expose()
  city: string;
  @Expose()
  country: string;
  @Expose()
  workerId:string
}
