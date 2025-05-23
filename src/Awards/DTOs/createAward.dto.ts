import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAwardDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  awardLink: string;

  @IsOptional()
  @IsString()
  describtion?: string;

  @IsNotEmpty()
  @IsString()
  entity: string
}