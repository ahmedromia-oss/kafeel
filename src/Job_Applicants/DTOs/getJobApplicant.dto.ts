import { Expose, Type } from 'class-transformer';
import { getWorkerDto } from 'src/Worker/DTOs/getWorker.dto';
import { Worker } from 'src/Worker/worker.model';

export class getJobApplicantDto {
  @Expose()
  describtion: string;
  @Expose()
  CV: string;
  @Expose()
  @Type(()=>getWorkerDto)
  worker:getWorkerDto
}
