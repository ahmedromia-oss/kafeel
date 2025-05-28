import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';
import { ValidationErrors } from 'src/constants';

export class CreateAwardDto {
  @IsOptional()
  @IsUrl()
  link?: string;
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  @IsString({ message: ValidationErrors.MUST_STRING })
  institution: string;

  @IsOptional()
  @IsString({ message: ValidationErrors.MUST_STRING })
  description?: string;

  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: ValidationErrors.INVALID_DATE })
  startDate?: string;

  @Transform(({ value }) => new Date(value))
  @IsOptional()
  @IsDate({ message: ValidationErrors.INVALID_DATE })
  endDate?: string;
}
