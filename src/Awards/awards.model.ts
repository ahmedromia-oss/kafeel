import { BaseEntity } from 'shared/shared.entity';
import { Worker } from 'src/Worker/worker.model';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 } from 'uuid';
@Entity()
export class Award extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  link: string;

  @Column()
  institution: string;

  @Column({ type: 'varchar', length: '255', nullable: true })
  description: string;

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ default: false })
  startYearOnly: boolean;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({ default: false })
  endYearOnly: boolean;
  @Column({ type: 'uuid' })
  workerId: string;
  @ManyToOne(() => Worker, (worker) => worker.awards , {onDelete:'CASCADE'})
  @JoinColumn({ name: 'workerId' })
  worker: Worker;

  @Column({ nullable: true })
  certificateFileUrl: string;

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = v4();
    }
  }
}
