import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ValidationErrors } from 'src/constants';

export class updateWorker {
  @IsOptional()
  @IsString({ message: ValidationErrors.MUST_STRING })
  jobTitle: string;
  @IsOptional()
  @IsString({ message: ValidationErrors.MUST_STRING })
  aboutMe: string;
}
