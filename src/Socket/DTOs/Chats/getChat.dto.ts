import { Expose, Type } from 'class-transformer';
import { getUserDto } from 'src/User/DTOs/getUserDto';
import { getMessageDto } from '../Messages/getMessage.dto';

export class getChatDto {
  @Expose()
  id: string;
  @Expose()
  @Type(() => getUserDto)
  members: getUserDto[];
  @Expose()
  @Type(() => getMessageDto)
  lastMessage: getMessageDto;
}
