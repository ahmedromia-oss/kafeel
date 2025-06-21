import { BaseEntity } from 'shared/shared.entity';
import { Company } from 'src/company/company.model';
import { JobType } from 'src/constants';
import { JobApplicants } from 'src/Job_Applicants/Job_applicants.model';
import { UserSavedJob } from 'src/User/models/userJobSaved.model';

import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  BeforeInsert,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm';
import { v4 } from 'uuid';

@Entity()
export class Job extends BaseEntity {
  @PrimaryColumn()
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

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = v4();
    }
  }
  @Column({ type: 'uuid', nullable: false })
  companyId: string;
  @ManyToOne(() => Company, (company) => company.Jobs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'companyId' })
  company: Company;
  @Column('text')
  email: string;
  @Column('text')
  currency: string;
  @Column('text')
  phoneNumber: string;
  @OneToMany(() => UserSavedJob, (savedJob) => savedJob.job)
  savedByUsers: UserSavedJob[];
  IsSaved:boolean
}
