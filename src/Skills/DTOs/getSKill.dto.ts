import { Expose } from 'class-transformer';
import { skillLevel } from 'src/constants';

export class GetSkillDto {
  @Expose()
  name: string;

  @Expose()
  skillLevel: skillLevel;

  @Expose()
  describtion: string;
}