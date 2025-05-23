import { skillLevel } from 'src/constants';
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
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: false, type: 'text' })
  name: string;
  @Column({ nullable: false, type: 'enum', enum: skillLevel })
  skillLevel: skillLevel;
  @Column({ nullable: true, type: 'text' })
  describtion: string;
  @ManyToOne(() => Worker, (worker) => worker.skills)
  @JoinColumn({ name: 'workerId' })
  worker: Worker;
  @Column({ type: 'uuid' })
  workerId: string;
}
