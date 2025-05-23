// src/transfer-announcement/dto/get-advertise.dto.ts
import { Expose, Type } from 'class-transformer';
import { JobType, PreferredSponsorType } from 'src/constants';

export class GetAdvertiseDto {
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
  workType: JobType;

  @Expose()
  description?: string;

  @Expose()
  workerId: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
