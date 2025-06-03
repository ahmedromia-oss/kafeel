import { BaseEntity } from 'shared/shared.entity';
import { skillLevel } from 'src/constants';
import { Worker } from 'src/Worker/worker.model';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 } from 'uuid';

@Entity()
export class Skill extends BaseEntity{
  @PrimaryColumn()
  id: string;
  @Column({ nullable: false, type: 'varchar', length: 255})
  name: string;
  @Column({ nullable: false, type: 'enum', enum: skillLevel })
  skillLevel: skillLevel;
  @Column({ nullable: true, type: 'varchar', length: 255})
  describtion: string;
  @ManyToOne(() => Worker, (worker) => worker.skills)
  @JoinColumn({ name: 'workerId' })
  worker: Worker;
  @Column({ type: 'uuid' })
  workerId: string;
  @BeforeInsert()
    generateId() {
      if (!this.id) {
        this.id = v4();
      }
    }
}
