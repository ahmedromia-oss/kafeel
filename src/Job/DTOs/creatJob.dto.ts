import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsNumber,
  IsUUID,
  Min,
  MaxLength,
  Max,
} from 'class-validator';
import { JobType, ValidationErrors } from 'src/constants';
import { MAX } from 'uuid';

export class CreateJobDto {
  @IsString({ message: ValidationErrors.MUST_STRING })
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  @MaxLength(100)
  title: string;

  @IsString({ message: ValidationErrors.MUST_STRING })
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  description: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(9999999)
  salary: number;

  @IsOptional()
  @IsBoolean()
  isRemote?: boolean;

  @IsString({ message: ValidationErrors.MUST_STRING })
  @IsOptional()
  @MaxLength(100 , {message:ValidationErrors.STRING_OUT_OF_RANGE})
  location?: string;

  @IsEnum(JobType , {message:ValidationErrors.MUST_JOB_TYPE})
  jobType: JobType;
}
