import { Expose, Type } from 'class-transformer';
import { getUserDto } from 'src/User/DTOs/getUserDto';

export class getWorkerDto {
  @Expose()
  aboutMe: string;
  @Expose()
  @Type(() => getUserDto)
  user: getUserDto;
}
