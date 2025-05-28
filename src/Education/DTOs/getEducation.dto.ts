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

export class getEducationDto {
  @Expose()
  id: string;
  @Expose()
  startDate: Date;
  @Expose()
  degree: education;

  @Expose()
  describtion: string;
  @Transform(({ value }) => {
    if (value === null || value === undefined) {
      return valuesString.PRESENT;
    }
  })
  @Expose()
  endDate: Date | string;
  @Expose()
  uniOrSchool: string;
  @Expose()
  uniOrSchoolUrl: string;
  @Expose()
  city: string;
  @Expose()
  country: string;
  @Expose()
  workerId: string;
}
