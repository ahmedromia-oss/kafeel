import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ValidationErrors } from 'src/constants';
import { getUserDto } from 'src/User/DTOs/getUserDto';

export class getMessageDto {
  @Expose()
  @IsString({ message: ValidationErrors.MUST_STRING })
  chatId: string;

  @Expose()
  content: string;

  @Expose()
  @Type(() => getUserDto)
  sender: getUserDto;

  @Expose()
  @Type(() => getUserDto)
  reciever: getUserDto;

  @Expose()
  attachments?: string[];
  @Expose()
  createdAt: Date;
}
