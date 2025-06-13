import { BaseEntity } from 'shared/shared.entity';
import { Worker } from 'src/Worker/worker.model';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  PrimaryColumn,
} from 'typeorm';
import { v4 } from 'uuid';

@Entity()
export class Experience extends BaseEntity {
  @PrimaryColumn()
  id: string;
  @Column({ nullable: false, type: 'varchar', length: 50, default: 'N/A' })
  jobTitle: string;
  @Column({ nullable: false, type: 'date' })
  startDate: Date;

  @ManyToOne(() => Worker, (worker) => worker.experiences)
  @JoinColumn({ name: 'workerId' })
  worker: Worker;
  @Column({ type: 'uuid' })
  workerId: string;

  @Column({ nullable: true, type: 'varchar', length: 255 })
  describtion: string;
  @Column({ nullable: true, type: 'date' })
  endDate: Date;
  @Column({ nullable: false, type: 'varchar', length: 255 })
  company: string;
  @Column({ nullable: true, type: 'varchar', length: 255 })
  companyUrl: string;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  country: string;
  @Column({ nullable: true, type: 'varchar', length: 255 })
  city: string;
  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = v4();
    }
  }
  yearsOfExperience: number;
  preCities: string;
}
