import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Column,
} from 'typeorm';
import { User } from './user.model';
import { Job } from 'src/Job/models/job.model';
import { BaseEntity } from 'shared/shared.entity';

@Entity()
export class UserSavedJob extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.savedJobs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Job, (job) => job.savedByUsers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'jobId' })
  job: Job;
  @Column({ type: 'uuid' })
  jobId: string;
  @Column({ type: 'uuid' })
  userId: string;
}
