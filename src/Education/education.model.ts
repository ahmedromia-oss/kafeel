import { education } from 'src/constants';
import { Worker } from 'src/Worker/worker.model';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Education {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: false, type: 'date' })
  startDate: Date;
  @Column({ nullable: false, type: 'enum', enum: education })
  degree: education;

  @ManyToOne(() => Worker, (worker) => worker.educations)
  @JoinColumn({ name: 'workerId' })
  worker: Worker;
  @Column({ type: 'uuid' })
  workerId: string;

  @Column({ nullable: true, type: 'text' })
  describtion: string;
  @Column({ nullable: true, type: 'date' })
  endDate: Date;
  @Column({ nullable: false, type: 'text' })
  uniOrSchool: string;
  @Column({ nullable: true, type: 'text' })
  uniOrSchoolUrl: string;
  @Column({ nullable: false, type: 'text' })
  country: string;
  @Column({ nullable: true, type: 'text' })
  city: string;
}
