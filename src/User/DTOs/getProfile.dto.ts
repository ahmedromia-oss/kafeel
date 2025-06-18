import { Expose, Transform, Type } from 'class-transformer';
import { GetAdvertiseDto } from 'src/Advertise/DTOs/getAdvertise.dto';
import { GetAwardDto } from 'src/Awards/DTOs/getAward.dto';
import { UserType } from 'src/constants';
import { getEducationDto } from 'src/Education/DTOs/getEducation.dto';
import { GetExperienceDto } from 'src/Experience/DTOs/getExperience.dto';
import { GetLanguageDto } from 'src/Languages/DTOs/getLanguage.dto';
import { GetSkillDto } from 'src/Skills/DTOs/getSKill.dto';
import { Skill } from 'src/Skills/skills.model';
import { getUserDto } from 'src/User/DTOs/getUserDto';
import { overLappingDates } from 'src/utils/overLappingdates';

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
  @Type(() => GetAdvertiseDto)
  advertises: GetAdvertiseDto[];
  @Expose({ groups: [UserType.KAFEEL] })
  userName: string;
  @Expose({ groups: [UserType.KAFEEL] })
  JobTitle: string;

  @Expose({ groups: [UserType.KAFEEL, UserType.COMPANY] })
  city: string;

  @Expose({ groups: [UserType.KAFEEL] })
  preferred: string;

  @Expose({ groups: [UserType.COMPANY] })
  companyName: string;

  @Expose({ groups: [UserType.COMPANY] })
  officePhoneNumber: string;

  @Expose({ groups: [UserType.COMPANY] })
  officialEmail: string;

  @Expose({ groups: [UserType.COMPANY] })
  websiteUrl: string;

  @Expose({ groups: [UserType.COMPANY] })
  officeCity: string;

  @Expose({ groups: [UserType.COMPANY] })
  commercialRegistrationNumber: string;

  @Expose({ groups: [UserType.COMPANY] })
  ownerName: string;

  @Expose({ groups: [UserType.COMPANY] })
  officeOwnerName: string;

  @Expose({ groups: [UserType.COMPANY] })
  licenseNumber: string;

  @Expose({ groups: [UserType.COMPANY] })
  officeName: string;

  @Expose({ groups: [UserType.COMPANY] })
  ownerPhone: string;

  @Expose({ groups: [UserType.COMPANY] })
  ownerEmail: string;

  @Expose({ groups: [UserType.COMPANY] })
  licenseImage: string; // URL or file path to license image

  @Expose({ groups: [UserType.COMPANY] })
  idImage: string;
  @Transform(({ value, obj }) => {
    // 'obj' is the entire object being transformed
    // 'value' would be the current value of yearsOfExperience (if any)
    return Math.ceil(overLappingDates(obj.experiences || []));
  })
  yearsOfExperience: number;
  @Expose({ groups: [UserType.WORKER] })
  @Transform(({ value, obj }) => {
    // 'obj' is the entire object being transformed
    // 'value' would be the current value of yearsOfExperience (if any)
    return createLocationString(obj.experiences || []);
  })
  previouseCities: string;
}
