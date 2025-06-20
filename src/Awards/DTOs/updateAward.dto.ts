import { Transform } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';
import { ValidationErrors } from 'src/constants';

export class UpdateAwardDto {
  @IsOptional()
  @IsUrl({}, { message: ValidationErrors.MUST_URL })
  link?: string;
  @IsOptional()
  @IsString({ message: ValidationErrors.MUST_STRING })
  institution: string;

  @IsOptional()
  @IsString({ message: ValidationErrors.MUST_STRING })
  description?: string;

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: ValidationErrors.INVALID_DATE })
  startDate?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (value) {
      return new Date(value);
    }
  })
  @IsDate({ message: ValidationErrors.INVALID_DATE })
  endDate?: string;
}
