import { education, languageLevel, skillLevel } from 'src/constants';
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
export class Language {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: false, type: 'text' })
  language: string;
  @Column({ nullable: false, type: 'enum' , enum:languageLevel})
  lanuageLevel: languageLevel;
  @Column({ nullable: true, type: 'text' })
  describtion: string;
  @ManyToOne(() => Worker, (worker) => worker.languages)
  @JoinColumn({ name: 'workerId' })
  worker: Worker;
  @Column({type:'uuid'})
  workerId: string;
}
