import {
  IsString,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsNumber,
  IsUUID,
  Min,
  MaxLength,
  Max,
  IsNotEmpty,
} from 'class-validator';
import { JobType, ValidationErrors } from 'src/constants';

export class UpdateJobDto {
  @IsString({ message: ValidationErrors.MUST_STRING })
  @IsOptional()
  @MaxLength(100)
  title?: string;

  @IsString({ message: ValidationErrors.MUST_STRING })
  @IsOptional()
  description?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsOptional()
  @Max(99999999999)
  salary?: number;

  @IsString({ message: ValidationErrors.MUST_STRING })
  @IsOptional()
  @MaxLength(100, { message: ValidationErrors.STRING_OUT_OF_RANGE })
  location?: string;

  @IsEnum(JobType, { message: ValidationErrors.MUST_JOB_TYPE })
  @IsOptional()
  jobType?: JobType;

  @IsBoolean()
  @IsOptional()
  isRemote?: boolean;
  @IsOptional({ message: ValidationErrors.REQUIRED })
  email: string;
  @IsOptional({ message: ValidationErrors.REQUIRED })
  currency: string;
  @IsOptional({ message: ValidationErrors.REQUIRED })
  phoneNumber: string;
  @IsBoolean()
  @IsOptional()
  isOpen:boolean
}
