import { Expose, Transform } from 'class-transformer';
import { Code, valuesString } from 'src/constants';

export class GetAwardDto {
  @Expose()
  id: string;
  @Expose()
  link?: string;
  @Expose()
  institution: string;

  @Expose()
  description?: string;

  @Expose()
  startDate?: Date | string;

  @Expose()
  @Transform(({ value }) => {
    if (value === null || typeof value === 'undefined')
      return valuesString.PRESENT;

    return new Date(value);
  })
  endDate?: Date | string;

  @Expose()
  certificateFileUrl?: string;
  @Expose()
  workerId: string;
}
