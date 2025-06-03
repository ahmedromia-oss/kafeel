// src/transfer-announcement/transfer-announcement.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  PrimaryColumn,
} from 'typeorm';

import { Worker } from 'src/Worker/worker.model';
import { JobType, PreferredSponsorType } from 'src/constants';
import { v4 } from 'uuid';
import { BaseEntity } from 'shared/shared.entity';

@Entity()
export class Advertise extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 100 })
  jobTitle: string;

  @Column({ type: 'varchar', length: 50 })
  currentCity: string;
  @Column({ type: 'boolean', default: true })
  IsOpen: boolean;
  @Column({
    type: 'enum',
    enum: PreferredSponsorType,
  })
  preferredSponsorType: PreferredSponsorType;
  @Column({ type: 'varchar', length: 50, nullable: true })
  expectedNotificationTime: string;

  @Column({
    type: 'enum',
    enum: JobType,
  })
  workType: JobType;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column()
  workerId: string;

  @ManyToOne(() => Worker, (worker) => worker.advertises)
  @JoinColumn({ name: 'workerId' })
  worker: Worker;
  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = v4();
    }
  }
}
