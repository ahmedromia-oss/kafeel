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
import { Company } from 'src/company/company.model';
import { User } from 'src/User/models/user.model';

@Entity('job_applicants')
@Unique(['userId', 'JobId']) // Ensures a user can't apply to the same job multiple times
export class JobApplicants extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'uuid' })
  userId: string;
  @Column({ type: 'uuid' })
  companyId: string;
  @Column({ type: 'uuid' })
  JobId: string;
  @ManyToOne(() => User, (user) => user.jobApplications, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'userId' })
  User: User;

 

  @ManyToOne(() => Job, (job) => job.applicants, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'JobId' })
  job: Job;

  @Column({ type: 'varchar', length: 255 })
  CV: string;
  @Column({ type: 'varchar', length: 255 })
  describtion: string;

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = v4();
    }
  }
}
