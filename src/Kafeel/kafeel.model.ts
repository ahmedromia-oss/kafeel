import { BaseEntity } from 'shared/shared.entity';
import { Job } from 'src/Job/models/job.model';
import { User } from 'src/User/models/user.model';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
@Entity()
export class kafeel extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  userId: string;
  @OneToOne(() => User, { nullable: false, eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
  @Column({ nullable: true, type: 'varchar', length: 255 })
  userName: string;
  @Column({ nullable: true, type: 'varchar', length: 255 })
  JobTitle: string;
  @Column({ nullable: true, type: 'varchar', length: 255 })
  city: string;
  @Column({ nullable: true, type: 'varchar', length: 255 })
  preferred: string;
  @OneToMany(() => Job, (job) => job.Kafeel)
  Jobs: Job[];
}
