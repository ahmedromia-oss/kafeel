// src/transfer-announcement/dto/update-advertise.dto.ts
import { Expose } from 'class-transformer';
import {
  IsOptional,
  IsString,
  MaxLength,
  IsEnum,
  IsUUID,
} from 'class-validator';
import { JobType, PreferredSponsorType } from 'src/constants';

export class UpdateAdvertiseDto {
  
  @IsOptional()
  @IsString({ message: 'Job title must be a string.' })
  @MaxLength(100, { message: 'Job title must not exceed 100 characters.' })
  jobTitle?: string;

  
  @IsOptional()
  @IsString({ message: 'Current city must be a string.' })
  @MaxLength(50, { message: 'Current city must not exceed 50 characters.' })
  currentCity?: string;

  
  @IsOptional()
  @IsEnum(PreferredSponsorType, { message: 'Preferred sponsor type is invalid.' })
  preferredSponsorType?: PreferredSponsorType;

  
  @IsOptional()
  @IsString({ message: 'Expected notification time must be a string.' })
  @MaxLength(30, { message: 'Expected notification time must not exceed 30 characters.' })
  expectedNotificationTime?: string;

  
  @IsOptional()
  @IsEnum(JobType, { message: 'Work type is invalid.' })
  workType?: JobType;

  
  @IsOptional()
  @IsString({ message: 'Description must be a string.' })
  @MaxLength(500, { message: 'Description must not exceed 500 characters.' })
  description?: string;

}
