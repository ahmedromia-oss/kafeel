import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { skillLevel, ValidationErrors } from 'src/constants';

export class updateSkillDto {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsEnum(skillLevel, { message: ValidationErrors.INVALID_SKILL_LEVEL })
  skillLevel: skillLevel;
  @IsOptional()
  @IsString()
  describtion: string;
}
