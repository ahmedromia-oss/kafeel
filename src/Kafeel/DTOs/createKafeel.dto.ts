import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ValidationErrors } from 'src/constants';

export class CreatekafeelDto {
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  userName: string;

  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  JobTitle: string;

  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  city: string;

  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  preferred: string;
}
