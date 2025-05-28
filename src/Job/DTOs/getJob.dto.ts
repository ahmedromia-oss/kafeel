import { Expose } from 'class-transformer';
import { JobType } from 'src/constants';

export class GetJobDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  salary: number;

  @Expose()
  location: string;

  @Expose()
  jobType: JobType;

  @Expose()
  isRemote: boolean;
  @Expose()
  companyId: string;
}
