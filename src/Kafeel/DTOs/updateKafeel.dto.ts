import { IsOptional, IsString, Length } from 'class-validator';

export class UpdatekafeelDto {
  @IsOptional()
  userName: string;

  @IsOptional()
  JobTitle: string;

  @IsOptional()
  city: string;

  @IsOptional()
  preferred: string;
}
