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
  JoinTable,
  ManyToMany,
  OneToMany,
  JoinColumn,
  OneToOne,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';
import { BaseEntity } from 'shared/shared.entity';

@Entity()
export class Worker extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  userId: string;
  @Column({ type: 'text', nullable: true })
  jobTitle: string;
  @Column({ type: 'text', nullable: true })
  aboutMe: string;
  @OneToOne(() => User, { cascade: true, eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;
  @OneToMany(() => Experience, (experience) => experience.worker)
  experiences: Experience[];
  @OneToMany(() => Education, (education) => education.worker)
  educations: Education[];
  @OneToMany(() => Skill, (Skill) => Skill.worker)
  skills: Skill[];
  @OneToMany(() => Language, (language) => language.worker)
  languages: Language[];
  @OneToMany(() => Award, (award) => award.worker)
  awards: Award[];
  @OneToMany(() => Advertise, (advertise) => advertise.worker)
  advertises: Advertise[];
  @Column({ type: 'text', nullable: true })
  cv: string;

  yearsOfExperience: number = 0;
  previouseCities: string = '';
}
