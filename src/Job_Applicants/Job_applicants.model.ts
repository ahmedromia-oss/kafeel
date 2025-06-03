import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Unique,
  JoinColumn,
  Column,
  BeforeInsert,
  PrimaryColumn,
} from 'typeorm';

import { Worker } from 'src/Worker/worker.model';
import { Job } from 'src/Job/models/job.model';
import { v4 } from 'uuid';
import { BaseEntity } from 'shared/shared.entity';

@Entity('job_applicants')
@Unique(['workerId', 'JobId']) // Ensures a user can't apply to the same job multiple times
export class JobApplicants extends BaseEntity{
  @PrimaryColumn()
  id: string;

  @Column({ type: 'uuid' })
  workerId: string;
  @Column({ type: 'uuid' })
  JobId: string;
  @ManyToOne(() => Worker, (worker) => worker.jobApplications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workerId' })
  worker: Worker;

  @ManyToOne(() => Job, (job) => job.applicants, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'JobId' })
  job: Job;

  @Column({ type: 'varchar', length: 255})
  CV: string;
  @Column({ type: 'varchar', length: 255})
  describtion: string;

 
  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = v4();
    }
  }
  
}
