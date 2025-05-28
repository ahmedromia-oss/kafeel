import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { skillLevel, ValidationErrors } from 'src/constants';

export class createSkillDto {
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  @IsString({ message: ValidationErrors.MUST_STRING })
  name: string;
  @IsNotEmpty()
  @IsEnum(skillLevel, { message: ValidationErrors.INVALID_SKILL_LEVEL })
  skillLevel: skillLevel;
  @IsOptional()
  @IsString({ message: ValidationErrors.MUST_STRING })
  describtion: string;
}
