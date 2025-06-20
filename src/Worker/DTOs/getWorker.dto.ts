import { Expose, Type } from 'class-transformer';
import { getUserDto } from 'src/User/DTOs/getUserDto';

export class getWorkerDto {
  @Expose()
  jobTitle: string;
  @Expose()
  aboutMe: string;
  @Expose()
  @Type(() => getUserDto)
  user: getUserDto;
  @Expose()
  yearsOfExperience:number
  @Expose()
  previouseCities:string
  @Expose()
  cv:string
}
