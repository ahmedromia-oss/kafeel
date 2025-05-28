import { Company } from 'src/company/company.model';
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
  BeforeInsert,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm';
import { v4 } from 'uuid';

@Entity()
export class Job {
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = v4();
    }
  }
  @Column({type:'uuid' , nullable:false})
  companyId:string
  @ManyToOne(() => Company, (company) =>company.Jobs , { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'companyId' })
  company: Company;
}
