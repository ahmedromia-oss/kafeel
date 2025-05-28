import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { skillLevel, ValidationErrors } from 'src/constants';

export class updateSkillDto {
  @IsOptional()
  @IsString({ message: ValidationErrors.MUST_STRING })
  name: string;
  @IsOptional()
  @IsEnum(skillLevel, { message: ValidationErrors.INVALID_SKILL_LEVEL })
  skillLevel: skillLevel;
  @IsOptional()
  @IsString({ message: ValidationErrors.MUST_STRING })
  describtion: string;
}
