import { IsNotEmpty } from 'class-validator';
import { ValidationErrors } from 'src/constants';

export class createChatDto {
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  recieverId: string;
}
