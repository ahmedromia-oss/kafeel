import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateAwardDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  awardLink?: string;

  @IsOptional()
  @IsString()
  describtion?: string;

  @IsOptional()
  @IsString()
  entity?: string;

  @IsOptional()
  @IsDateString()
  date?: Date;

  
}
