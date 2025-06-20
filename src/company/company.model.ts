import { Advertise } from 'src/Advertise/advertise.model';
import { Award } from 'src/Awards/awards.model';

import { Education } from 'src/Education/education.model';
import { Experience } from 'src/Experience/Experience.model';
import { Language } from 'src/Languages/languages.model';
import { JobApplicants } from 'src/Job_Applicants/Job_applicants.model';
import { Skill } from 'src/Skills/skills.model';
import { User } from 'src/User/models/user.model';
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
  @PrimaryColumn({ type: 'uuid' })
  userId: string;
  @Column({ type: 'text', nullable: true })
  aboutMe: string;
  @OneToOne(() => User, { cascade: true, eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;
  @OneToMany(() => Job, (job) => job.company)
  Jobs: Job[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  companyName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  officePhoneNumber: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  officialEmail: string;

  @Column({ nullable: true })
  websiteUrl: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  officeCity: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  commercialRegistrationNumber: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ownerName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  officeOwnerName: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  licenseNumber: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  officeName: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  ownerPhone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ownerEmail: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  licenseImage: string; // URL or file path to license image

  @Column({ type: 'varchar', length: 255, nullable: true })
  idImage: string; // URL or file path to ID image
}
