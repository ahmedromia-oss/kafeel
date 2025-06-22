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
import { UserSavedJob } from 'src/User/models/userJobSaved.model';
import { UserSavedAdvertise } from 'src/User/models/userAdvertiseSaved.model';
import { Company } from 'src/company/company.model';

@Entity()
export class Advertise extends BaseEntity {
  @PrimaryColumn()
  id: string;
  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;
  @Column({ type: 'varchar', length: 100, nullable: true })
  phoneNumber: string;
  @Column({ type: 'varchar', length: 100, nullable: true })
  userName: string;

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

  @Column({ nullable: true })
  workerId: string;

  @Column({ nullable: true })
  companyId: string;

  @OneToMany(
    () => UserSavedAdvertise,
    (savedAdvertise) => savedAdvertise.advertise,
  )
  savedByUsers: UserSavedAdvertise[];

  @ManyToOne(() => Worker, (worker) => worker.advertises, { nullable: true })
  @JoinColumn({ name: 'workerId' })
  worker: Worker;
  @Column({ type: 'text', nullable: true })
  currencey: string;
  @ManyToOne(() => Company, (company) => company.advertises, { nullable: true })
  @JoinColumn({ name: 'companyId' })
  company: Company;
  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = v4();
    }
  }
  IsSaved: boolean;
}
