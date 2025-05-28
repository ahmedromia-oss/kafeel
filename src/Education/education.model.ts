import { education } from 'src/constants';
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
export class Education {
  @PrimaryColumn()
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

  @Column({ nullable: true, type: 'varchar', length: 255})
  describtion: string;
  @Column({ nullable: true, type: 'date' })
  endDate: Date;
  @Column({ nullable: false, type: 'varchar', length: 255})
  uniOrSchool: string;
  @Column({ nullable: true, type: 'varchar', length: 255})
  uniOrSchoolUrl: string;
  @Column({ nullable: false, type: 'varchar', length: 255})
  country: string;
  @Column({ nullable: true, type: 'varchar', length: 255})
  city: string;
  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = v4();
    }
  }
 
}
