import { JobType } from 'src/constants';
import { JobApplicants } from 'src/Job_Applicants/Job_applicants.model';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  salary: number;

  @Column({ nullable: true })
  location?: string;

  @Column({
    type: 'enum',
    enum: JobType,
  })
  jobType: JobType;

  @Column({ default: false })
  isRemote: boolean;

  @OneToMany(() => JobApplicants, (jobApplicant) => jobApplicant.job)
  applicants: JobApplicants[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
