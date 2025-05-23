import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { skillLevel, ValidationErrors } from 'src/constants';

export class createSkillDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsEnum(skillLevel, { message: ValidationErrors.INVALID_SKILL_LEVEL })
  skillLevel: skillLevel;
  @IsOptional()
  @IsString()
  describtion: string;
}
