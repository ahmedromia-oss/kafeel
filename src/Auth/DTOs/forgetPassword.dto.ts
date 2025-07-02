import { IsNotEmpty, Matches, MinLength } from 'class-validator';
import { ValidationErrors } from 'src/constants';

export class forgetPasswordDto {
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  
  
  @MinLength(8, { message: ValidationErrors.MUST_8_CHRACHTERS })
  newPassword: string;
}
