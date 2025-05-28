import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { languageLevel, ValidationErrors } from 'src/constants';

export class UpdateLanguageDto {
  @IsOptional()
  @IsString({ message: ValidationErrors.MUST_STRING })
  language: string;

  @IsOptional()
  @IsEnum(languageLevel, { message: ValidationErrors.INVALID_LANGUAGE_LEVEL })
  lanuageLevel?: languageLevel;

  @IsOptional()
  @IsString({ message: ValidationErrors.MUST_STRING })
  describtion?: string;
}
