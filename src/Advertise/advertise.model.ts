// src/transfer-announcement/transfer-announcement.entity.ts

import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';

import { Worker } from 'src/Worker/worker.model';
import { JobType, PreferredSponsorType } from 'src/constants';
import { v4 } from 'uuid';
import { BaseEntity } from 'shared/shared.entity';
import { UserSavedJob } from 'src/User/models/userJobSaved';
import { UserSavedAdvertise } from 'src/User/models/userAdvertiseSaved';

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

  @OneToMany(() => UserSavedAdvertise, (savedAdvertise) => savedAdvertise.advertise)
  savedByUsers: UserSavedAdvertise[];

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
