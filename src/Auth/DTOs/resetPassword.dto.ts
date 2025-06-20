import { IsNotEmpty, Matches, MinLength } from 'class-validator';
import { ValidationErrors } from 'src/constants';

export class resetPassword {
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  oldPassword: string;
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z])\S+$/, {
    message: '1UP_1LOWER_1SPECIAL_2NUM',
  })
  @MinLength(8, { message: ValidationErrors.MUST_8_CHRACHTERS })
  newPassword: string;
}
