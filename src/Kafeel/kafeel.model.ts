import { BaseEntity } from 'shared/shared.entity';
import { User } from 'src/User/user.model';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
@Entity()
export class kafeel extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  userId: string;
  @OneToOne(() => User, { nullable: false, eager: true })
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
}
