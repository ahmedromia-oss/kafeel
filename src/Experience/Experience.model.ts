
import { Worker } from 'src/Worker/worker.model';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Experience {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: false, type: 'date' })
  startDate: Date;

  @ManyToOne(() => Worker, (worker) => worker.experiences)
  @JoinColumn({ name: 'workerId' })
  worker: Worker;
  @Column({type:'uuid'})
  workerId:string

  @Column({ nullable: true, type: 'text' })
  describtion: string;
  @Column({ nullable: true, type: 'date' })
  endDate: Date;
  @Column({ nullable: false, type: 'text' })
  company: string;
  @Column({ nullable: true, type: 'text' })
  companyUrl: string;

  @Column({ nullable: false, type: 'text' })
  country: string;
  @Column({ nullable: true, type: 'text' })
  city: string;
}
