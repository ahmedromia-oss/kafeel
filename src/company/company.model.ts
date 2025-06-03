
import { Advertise } from 'src/Advertise/advertise.model';
import { Award } from 'src/Awards/awards.model';

import { Education } from 'src/Education/education.model';
import { Experience } from 'src/Experience/Experience.model';
import { Language } from 'src/Languages/languages.model';
import { JobApplicants } from 'src/Job_Applicants/Job_applicants.model';
import { Skill } from 'src/Skills/skills.model';
import { User } from 'src/User/user.model';
import {
  Entity,
  Column,

  PrimaryColumn,

  OneToMany,
  JoinColumn,
  OneToOne,
  
 
} from 'typeorm';
import { Job } from 'src/Job/models/job.model';
import { BaseEntity } from 'shared/shared.entity';

@Entity()
export class Company extends BaseEntity {
  @PrimaryColumn({type:'uuid'})
  userId: string;
  @Column({ type: 'text', nullable: true })
  aboutMe: string;
  @OneToOne(() => User, { cascade: true, eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;
  @OneToMany(() => Job, (job) => job.company)
  Jobs: Job[];
  
 
}
