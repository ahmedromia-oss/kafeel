import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserType, ValidationErrors } from 'src/constants';

export class loginDto {
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  phoneNumber: string;
  @IsEnum(UserType, { message: 'MUST_BE_VALID_USERTYPE' })
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  @Transform(({ value }) =>
    typeof value === 'string' ? value?.toUpperCase() : value,
  )
  userType: string;
  @IsNotEmpty()
  OTPcode:string
}
