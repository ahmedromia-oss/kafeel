import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Column,
} from 'typeorm';
import { User } from './user.model';
import { Job } from 'src/Job/models/job.model';
import { BaseEntity } from 'shared/shared.entity';
import { Advertise } from 'src/Advertise/advertise.model';

@Entity()
export class UserSavedAdvertise extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.savedAdvertises, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Advertise, (advertise) => advertise.savedByUsers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'advertiseId' })
  advertise: Advertise;
  @Column({ type: 'uuid' })
  advertiseId: string;
  @Column({ type: 'uuid' })
  userId: string;
}
