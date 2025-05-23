import {
  IsString,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsNumber,
  IsUUID,
  Min,
  MaxLength,
} from 'class-validator';
import { JobType } from 'src/constants';

export class UpdateJobDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsOptional()
  salary?: number;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  location?: string;

  @IsEnum(JobType)
  @IsOptional()
  jobType?: JobType;

  @IsBoolean()
  @IsOptional()
  isRemote?: boolean;

 
}
