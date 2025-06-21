import { Expose, Type } from 'class-transformer';
import { GetAdvertiseDto } from 'src/Advertise/DTOs/getAdvertise.dto';
import { UserType } from 'src/constants';
import { GetJobDto } from 'src/Job/DTOs/getJob.dto';
export class getPrivateUserDto {
  @Expose()
  id: string;
  @Expose()
  birthDate: Date;
  @Expose()
  country: string;

  @Expose()
  phoneNumber: string;
  @Expose()
  phoneVerified: boolean;
  @Expose()
  emailVerified: boolean;
  @Expose()
  email: string;
  @Expose()
  profilePhoto: string;
  @Expose()
  lastName: string;
  @Expose()
  firstName: string;
  @Expose()
  userType: UserType;
  @Expose()
  nationalId: string;
  @Expose()
  userApproved: boolean;
  @Expose()
  @Type(() => GetJobDto)
  savedJobs: GetJobDto;
  @Expose()
  @Type(() => GetAdvertiseDto)
  savedAdvertises: GetAdvertiseDto;
}
