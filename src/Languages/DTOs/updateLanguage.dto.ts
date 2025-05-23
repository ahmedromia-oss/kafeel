import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { languageLevel, ValidationErrors } from 'src/constants';

export class UpdateLanguageDto {
  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsEnum(languageLevel, { message: ValidationErrors.INVALID_LANGUAGE_LEVEL })
  lanuageLevel?: languageLevel;

  @IsOptional()
  @IsString()
  describtion?: string;

}
