import { Expose, Type } from 'class-transformer';
import { getUserDto } from 'src/User/DTOs/getUserDto';

export class getKafeelDto {
  @Expose()
  @Type(() => getUserDto)
  user: getUserDto;
  @Expose()
  userName: string;
  @Expose()
  JobTitle: string;
  @Expose()
  city: string;
  @Expose()
  preferred: string;
}
