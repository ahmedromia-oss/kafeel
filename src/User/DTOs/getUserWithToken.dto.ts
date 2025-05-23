import { Expose } from 'class-transformer';
export class getUserDtoWithToken {
  @Expose()
  refreshToken: string;
  @Expose()
  Accesstoken: string;
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
}
