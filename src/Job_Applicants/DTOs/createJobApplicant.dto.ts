import { IsString, IsOptional } from 'class-validator';
import { ValidationErrors } from 'src/constants';

export class CreateJobApplicantDto {
  @IsOptional()
  @IsString({ message: ValidationErrors.MUST_STRING })
  describtion: string;
}
