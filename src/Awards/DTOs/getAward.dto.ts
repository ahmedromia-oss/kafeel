import { Expose } from 'class-transformer';

export class GetAwardDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  awardLink: string;

  @Expose()
  describtion: string;

  @Expose()
  entity: string;

  @Expose()
  date: Date;
}
