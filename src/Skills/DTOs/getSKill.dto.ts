import { Expose } from 'class-transformer';
import { skillLevel } from 'src/constants';

export class GetSkillDto {
  @Expose()
  id: string;
  @Expose()
  name: string;

  @Expose()
  skillLevel: skillLevel;

  @Expose()
  describtion: string;
  @Expose()
  workerId: string;
}
