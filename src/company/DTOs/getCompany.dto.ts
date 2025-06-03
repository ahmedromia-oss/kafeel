import { Expose, Transform, Type } from 'class-transformer';
import { getUserDto } from 'src/User/DTOs/getUserDto';

export class getCompanyDto {
  @Expose()
  @Transform(({ value }) => (value?.length) ?? 0)
  Jobs: number;
  @Expose()
  @Type(() => getUserDto)
  user: getUserDto;
}
