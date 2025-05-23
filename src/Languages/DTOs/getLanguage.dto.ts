import { Expose } from 'class-transformer';
import { languageLevel } from 'src/constants';

export class GetLanguageDto {
  @Expose()
  id: string;

  @Expose()
  language: string;

  @Expose()
  lanuageLevel: languageLevel;

  @Expose()
  describtion: string;

}
