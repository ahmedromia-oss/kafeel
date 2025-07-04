// src/transfer-announcement/dto/get-advertise.dto.ts
import { Expose, Transform, Type } from 'class-transformer';
import { getCompanyDto } from 'src/company/DTOs/getCompany.dto';
import { JobType, PreferredSponsorType } from 'src/constants';
import { getUserDto } from 'src/User/DTOs/getUserDto';
import { User } from 'src/User/models/user.model';
import { getWorkerDto } from 'src/Worker/DTOs/getWorker.dto';

export class getAdvertiseForKafeel {
 
  @Expose()
  email: string;
  @Expose()
  phoneNumber: string;
  @Expose()
  userName: string;
  @Expose()
  id: string;

  @Expose()
  jobTitle: string;

  @Expose()
  currentCity: string;

  @Expose()
  preferredSponsorType: PreferredSponsorType;

  @Expose()
  expectedNotificationTime: string;
  @Expose()
  IsOpen: boolean;

  @Expose()
  workType: JobType;

  @Expose()
  description?: string;

  @Expose()
  @Type(() => getWorkerDto)
  worker: getWorkerDto;
  @Expose()
  @Type(() => getCompanyDto)
  company: getCompanyDto;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
  @Expose()
  currentUserId: string;
  savedByUsers: User;
  @Expose()
  @Transform(({ obj }) => {
    return (
      obj.savedByUsers
        ?.map((e) => e.userId)
        .includes(obj?.currentUserId || '') || false
    );
  })
  IsSaved: boolean;
}
