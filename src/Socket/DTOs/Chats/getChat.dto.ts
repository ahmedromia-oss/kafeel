import { Expose, Type } from 'class-transformer';
import { getUserDto } from 'src/User/DTOs/getUserDto';

export class getChatDto {
  @Expose()
  id: string;
  @Expose()
  @Type(() => getUserDto)
  host: getUserDto;
  @Expose()
  @Type(() => getUserDto)
  reciever: getUserDto;
}
