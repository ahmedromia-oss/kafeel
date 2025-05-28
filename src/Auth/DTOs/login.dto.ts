import { IsNotEmpty } from 'class-validator';

import { Expose, Transform } from 'class-transformer';
import { ValidationErrors } from 'src/constants';
@Expose()
export class SignInUserDTO {
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  @Transform(({ value }) => value?.toLowerCase())
  email: string;
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  password: string;
}
