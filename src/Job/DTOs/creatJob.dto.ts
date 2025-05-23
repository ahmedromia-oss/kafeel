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
} from 'class-validator';
import { JobType } from 'src/constants';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  salary: number;

  @IsOptional()
  @IsBoolean()
  isRemote?: boolean;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  location?: string;

  @IsEnum(JobType)
  jobType: JobType;

 
}
