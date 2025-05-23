// src/transfer-announcement/dto/create-advertise.dto.ts
import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsEnum,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { JobType, PreferredSponsorType } from 'src/constants';

export class CreateAdvertiseDto {
  
  @IsNotEmpty({ message: 'Job title is required.' })
  @IsString({ message: 'Job title must be a string.' })
  @MaxLength(100, { message: 'Job title must not exceed 100 characters.' })
  jobTitle: string;

  
  @IsNotEmpty({ message: 'Current city is required.' })
  @IsString({ message: 'Current city must be a string.' })
  @MaxLength(50, { message: 'Current city must not exceed 50 characters.' })
  currentCity: string;

  
  @IsNotEmpty({ message: 'Preferred sponsor type is required.' })
  @IsEnum(PreferredSponsorType, { message: 'Preferred sponsor type is invalid.' })
  preferredSponsorType: PreferredSponsorType;

  
  @IsNotEmpty({ message: 'Expected notification time is required.' })
  @IsString({ message: 'Expected notification time must be a string.' })
  @MaxLength(30, { message: 'Expected notification time must not exceed 30 characters.' })
  expectedNotificationTime: string;

  
  @IsNotEmpty({ message: 'Work type is required.' })
  @IsEnum(JobType, { message: 'Work type is invalid.' })
  workType: JobType;

  
  @IsOptional()
  @IsString({ message: 'Description must be a string.' })
  @MaxLength(500, { message: 'Description must not exceed 500 characters.' })
  description?: string;

  
  @IsNotEmpty({ message: 'Worker ID is required.' })
  workerId: string;
}
