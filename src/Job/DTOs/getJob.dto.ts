import { Expose, Transform, Type } from 'class-transformer';
import { getCompanyDto } from 'src/company/DTOs/getCompany.dto';
import { JobType } from 'src/constants';
import { JobApplicants } from 'src/Job_Applicants/Job_applicants.model';

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
  createdAt: Date;

  @Expose()
  updatedAt: Date;
  @Expose()
  @Transform(({ value }) => value?.length ?? 0)
  applicants: number;
  @Expose()
  @Type(()=>getCompanyDto)
  company:getCompanyDto
}
