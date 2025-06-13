import { Expose, Type } from 'class-transformer';
import { GetAwardDto } from 'src/Awards/DTOs/getAward.dto';
import { getEducationDto } from 'src/Education/DTOs/getEducation.dto';
import { GetExperienceDto } from 'src/Experience/DTOs/getExperience.dto';
import { GetLanguageDto } from 'src/Languages/DTOs/getLanguage.dto';
import { GetSkillDto } from 'src/Skills/DTOs/getSKill.dto';

import { getPrivateUserDto } from './getPrivateUser.dto';
import { UserType } from 'src/constants';
import { GetAdvertiseDto } from 'src/Advertise/DTOs/getAdvertise.dto';

export class getProfileLockedDto {
  @Expose({ groups: [UserType.WORKER] })
  jobTitle: string;
  @Expose({ groups: [UserType.WORKER] })
  aboutMe: string;
  @Expose({ groups: [UserType.COMPANY, UserType.KAFEEL, UserType.WORKER] })
  @Type(() => getPrivateUserDto)
  user: getPrivateUserDto;
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
  @Type(() => GetAdvertiseDto)
  advertises: GetAdvertiseDto[];
}
