import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { languageLevel, ValidationErrors } from 'src/constants';

export class CreateLanguageDto {
  @IsNotEmpty()
  @IsString()
  language: string;

  @IsNotEmpty()
  @IsEnum(languageLevel, { message: ValidationErrors.INVALID_LANGUAGE_LEVEL })
  lanuageLevel: languageLevel;

  @IsOptional()
  @IsString()
  describtion?: string;

 
}
