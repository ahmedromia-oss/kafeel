// src/transfer-announcement/transfer-announcement.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Worker } from 'src/Worker/worker.model';
import { JobType, PreferredSponsorType } from 'src/constants';



@Entity()
export class Advertise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  jobTitle: string;

  @Column({ type: 'varchar', length: 50 })
  currentCity: string;

  @Column({
    type: 'enum',
    enum: PreferredSponsorType,
  })
  preferredSponsorType: PreferredSponsorType;

  expectedNotificationTime: string;

  @Column({
    type: 'enum',
    enum: JobType,
  })
  workType: JobType;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
  @Column()
  workerId: string;
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
  @ManyToOne(() => Worker, (worker) => worker.advertises)
  @JoinColumn({ name: 'workerId' })
  worker: Worker;
}
