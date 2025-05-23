import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Unique,
  JoinColumn,
  Column,
} from 'typeorm';

import { Worker } from 'src/Worker/worker.model';
import { Job } from 'src/Job/models/job.model';

@Entity('job_applicants')
@Unique(['workerId', 'JobId']) // Ensures a user can't apply to the same job multiple times
export class JobApplicants {
  @PrimaryGeneratedColumn('uuid')
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

  @Column({ type: 'text' })
  CV: string;
  @Column({ type: 'text' })
  describtion: string;

  @CreateDateColumn()
  appliedAt: Date;
}
