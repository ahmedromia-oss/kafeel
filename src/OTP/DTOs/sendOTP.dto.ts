import { IsNotEmpty } from 'class-validator';
import { ValidationErrors } from 'src/constants';

export class sendOTPDTO {
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  phoneNumber: string;

}
