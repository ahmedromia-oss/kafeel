import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { languageLevel, ValidationErrors } from 'src/constants';

export class CreateLanguageDto {
  @IsNotEmpty({message:ValidationErrors.REQUIRED})
   @IsString({message:ValidationErrors.MUST_STRING})
  language: string;

  @IsNotEmpty()
  @IsEnum(languageLevel, { message: ValidationErrors.INVALID_LANGUAGE_LEVEL })
  lanuageLevel: languageLevel;

  @IsOptional()
   @IsString({message:ValidationErrors.MUST_STRING})
  describtion?: string;

 
}
