import { Expose, Type } from 'class-transformer';
import { GetAdvertiseDto } from 'src/Advertise/DTOs/getAdvertise.dto';
import { GetAwardDto } from 'src/Awards/DTOs/getAward.dto';
import { UserType } from 'src/constants';
import { getEducationDto } from 'src/Education/DTOs/getEducation.dto';
import { GetExperienceDto } from 'src/Experience/DTOs/getExperience.dto';
import { GetLanguageDto } from 'src/Languages/DTOs/getLanguage.dto';
import { GetSkillDto } from 'src/Skills/DTOs/getSKill.dto';
import { Skill } from 'src/Skills/skills.model';
import { getUserDto } from 'src/User/DTOs/getUserDto';

export class getProfileDto {
  @Expose({ groups: [UserType.WORKER] })
  jobTitle: string;
  @Expose({ groups: [UserType.WORKER] })
  aboutMe: string;
  @Expose({ groups: [UserType.COMPANY, UserType.KAFEEL, UserType.WORKER] })
  @Type(() => getUserDto)
  user: getUserDto;
  @Expose({ groups: [UserType.WORKER] })
  @Type(() => GetExperienceDto)
  experiences: GetExperienceDto[];
  @Expose({ groups: [UserType.WORKER] })
  @Type(() => GetLanguageDto)
  languages: GetLanguageDto[];
  @Expose({ groups: [UserType.WORKER] })
  @Type(() => GetSkillDto)
  @Expose({ groups: [UserType.WORKER] })
  skills: GetSkillDto[];
  @Expose({ groups: [UserType.WORKER] })
  @Type(() => GetAwardDto)
  awards: GetAwardDto;
  @Expose({ groups: [UserType.WORKER] })
  @Type(() => getEducationDto)
  educations: getEducationDto[];
  @Expose({ groups: [UserType.WORKER] })
  @Type(()=>GetAdvertiseDto)
  advertises:GetAdvertiseDto[]
}
