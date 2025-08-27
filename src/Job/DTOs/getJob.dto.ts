import { Expose, Transform, Type } from 'class-transformer';
import { getCompanyDto } from 'src/company/DTOs/getCompany.dto';
import { JobType } from 'src/constants';
import { getKafeelDto } from 'src/Kafeel/DTOs/getKafeel.dto';
import { kafeel } from 'src/Kafeel/kafeel.model';
import { User } from 'src/User/models/user.model';
import { UserSavedJob } from 'src/User/models/userJobSaved.model';

export class GetJobDto {
  currentUserId: string;
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  salary: number;

  @Expose()
  location: string;

  @Expose()
  jobType: JobType;

  @Expose()
  isRemote: boolean;
  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
  @Expose()
  @Transform(({ value }) => value?.length ?? 0)
  applicants: number;
  @Expose()
  @Type(() => getCompanyDto)
  company: getCompanyDto;
  @Expose()
  email: string;
  @Expose()
  currency: string;
  @Expose()
  phoneNumber: string;
  savedByUsers: UserSavedJob[];
  @Expose()
  @Transform(({ obj }) => {
    return obj.savedByUsers?.map((e)=>e.userId).includes(obj?.currentUserId || '') || false;
  })
  IsSaved: boolean;
  @Expose()
  @Type(()=>getKafeelDto)
  Kafeel:getKafeelDto
  @Expose()
  KafeelId:string
  @Expose()
  isOpen:boolean
}
