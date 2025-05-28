// src/transfer-announcement/dto/create-advertise.dto.ts
import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsEnum,
  IsOptional,
  IsUUID,
  Validate,
} from 'class-validator';
import { JobType, PreferredSponsorType, ValidationErrors } from 'src/constants';

export class CreateAdvertiseDto {
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  @IsString({ message: ValidationErrors.MUST_STRING })
  jobTitle: string;

  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  @IsString({ message: ValidationErrors.MUST_STRING })
  currentCity: string;

  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  @IsEnum(PreferredSponsorType, {
    message: ValidationErrors.MUST_BE_SPONSORTYPE,
  })
  preferredSponsorType: PreferredSponsorType;

  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  @IsString({ message: ValidationErrors.MUST_STRING })
  expectedNotificationTime: string;

  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  @IsEnum(JobType, { message: ValidationErrors.MUST_JOB_TYPE })
  workType: JobType;
  @IsOptional()
  IsOpen: boolean;

  @IsOptional()
  @IsString({ message: ValidationErrors.MUST_STRING })
  description?: string;
}
