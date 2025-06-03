import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ValidationErrors } from "src/constants";

export class CreateMessageDto {
  @IsNotEmpty({ message: ValidationErrors.REQUIRED })
  @IsString({ message: ValidationErrors.MUST_STRING })
  chatId: string;

  @IsOptional()
  @IsString({ message: ValidationErrors.MUST_STRING })
  content: string;


  @IsOptional()
  attachments?: string[];
}