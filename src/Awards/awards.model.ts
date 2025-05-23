import { Worker } from 'src/Worker/worker.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Award {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: false, type: 'text' })
  name: string;
  @Column({ nullable: false, type: 'text' })
  awardLink: string;
  @Column({ nullable: true, type: 'text' })
  describtion: string;
  @Column({ nullable: false, type: 'text' })
  entity: string;
  @Column({ nullable: true, type: 'date' })
  date: Date;
  @ManyToOne(() => Worker, (worker) => worker.awards)
  @JoinColumn({ name: 'workerId' })
  worker: Worker;
  @Column({type:'uuid'})
  workerId: string;
}
