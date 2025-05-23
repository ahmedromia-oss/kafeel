import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  NotContains,
} from 'class-validator';

import { Expose, Transform } from 'class-transformer';
import { UserType, ValidationErrors } from 'src/constants';

export class SignUpDTO {
  @IsEnum(UserType, { message: 'MUST_BE_VALID_USERTYPE' })
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  @Transform(({ value }) =>
    typeof value === 'string' ? value?.toUpperCase() : value,
  )
  userType: UserType;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  @IsString()
  nationalId: string;

  @Transform(({ value }) => {
    if (value) {
      return value.toLowerCase();
    }
  })
  @IsEmail({}, { message: ValidationErrors.MUST_EMAIL })
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  @MaxLength(50, { message: ValidationErrors.STRING_OUT_OF_RANGE })
  email: string;

  @Transform(({ value }) =>
    value
      .trim()
      .split(/[\s,\t,\n]+/)
      .join(' '),
  )
  @Matches('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z])', '', {
    message: '1UP_1LOWER_1SPECIAL_2NUM',
  })
  @NotContains(' ', { message: ValidationErrors.UNVALID_SPACE })
  @MinLength(8, { message: ValidationErrors.MUST_8_CHRACHTERS })
  password: string;

  @IsNotEmpty()
  @IsPhoneNumber(null, { message: ValidationErrors.UNVALID_PHONE_NUMBER })
  @MaxLength(15, { message: ValidationErrors.STRING_OUT_OF_RANGE })
  phoneNumber?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (value) {
      return value.toLowerCase();
    }
  })
  @MaxLength(15, { message: ValidationErrors.STRING_OUT_OF_RANGE })
  @IsString({ message: ValidationErrors.MUST_STRING })
  @Transform(({ value }) => {
    if (value) {
      return value
        .trim()
        .split(/[\s,\t,\n]+/)
        .join(' ');
    }
  })
  @NotContains(' ', { message: ValidationErrors.UNVALID_SPACE })
  firstName: string;

  @Transform(({ value }) => {
    if (value) {
      return value
        .trim()
        .split(/[\s,\t,\n]+/)
        .join(' ');
    }
  })
  @MaxLength(15, { message: ValidationErrors.STRING_OUT_OF_RANGE })
  @IsString({ message: ValidationErrors.MUST_STRING })
  @Transform(({ value }) => {
    if (value) {
      return value.toLowerCase();
    }
  })
  @IsOptional()
  @NotContains(' ', { message: ValidationErrors.UNVALID_SPACE })
  lastName: string;

  @IsOptional()
  @MaxLength(50, { message: ValidationErrors.STRING_OUT_OF_RANGE })
  @IsString({ message: ValidationErrors.MUST_STRING })
  country: string;

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: ValidationErrors.INVALID_DATE})
  birthDate: Date;
}
