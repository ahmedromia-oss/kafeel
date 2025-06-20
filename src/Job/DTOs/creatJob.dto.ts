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
import { Code, JobType, ValidationErrors } from 'src/constants';

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
  @MaxLength(100, { message: ValidationErrors.STRING_OUT_OF_RANGE })
  location?: string;

  @IsEnum(JobType, { message: ValidationErrors.MUST_JOB_TYPE })
  jobType: JobType;

  @IsNotEmpty({message:ValidationErrors.REQUIRED})
  email:string
  @IsNotEmpty({message:ValidationErrors.REQUIRED})
  currency:string
  @IsNotEmpty({message:ValidationErrors.REQUIRED})
  phoneNumber:string
}
