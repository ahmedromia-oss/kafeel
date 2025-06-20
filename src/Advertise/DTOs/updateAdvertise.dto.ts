// src/transfer-announcement/dto/update-advertise.dto.ts
import { Expose } from 'class-transformer';
import {
  IsOptional,
  IsString,
  MaxLength,
  IsEnum,
  IsUUID,
} from 'class-validator';
import { JobType, PreferredSponsorType, ValidationErrors } from 'src/constants';

export class UpdateAdvertiseDto {
  
    @IsOptional()
    @IsString({ message: ValidationErrors.MUST_STRING })
    
    jobTitle: string;
    @IsOptional()
    IsOpen:boolean
  
    @IsOptional()
    @IsString({ message: ValidationErrors.MUST_STRING })
  
    currentCity: string;
  
    @IsOptional()
    @IsEnum(PreferredSponsorType, {
      message: ValidationErrors.MUST_BE_SPONSORTYPE,
    })
    preferredSponsorType: PreferredSponsorType;
  
    @IsOptional()
    @IsString({ message: ValidationErrors.MUST_STRING })
    expectedNotificationTime: string;
  
    @IsOptional()
    @IsEnum(JobType, { message: ValidationErrors.MUST_JOB_TYPE })
    workType: JobType;
  
    @IsOptional()
    @IsString({ message: ValidationErrors.MUST_STRING })
    description?: string;

}
