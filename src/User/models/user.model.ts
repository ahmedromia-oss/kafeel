import { BaseEntity } from 'shared/shared.entity';
import { UserType } from 'src/constants';
import { Chat } from 'src/Socket/models/chat.model';
import { Message } from 'src/Socket/models/message.model';
import { Worker } from 'src/Worker/worker.model';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
  OneToMany,
  BeforeInsert,
  PrimaryColumn,
} from 'typeorm';
import { v4 } from 'uuid';
import { UserSavedJob } from './userJobSaved.model';
import { UserSavedAdvertise } from './userAdvertiseSaved.model';
import { JobApplicants } from 'src/Job_Applicants/Job_applicants.model';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  id: string;
  @Column({ nullable: true, type: 'varchar', length: 255 })
  firstName: string;
  @OneToMany(() => JobApplicants, (jobApplicant) => jobApplicant.User)
  jobApplications: JobApplicants[];

  @Column({ nullable: true, type: 'varchar', length: 255 })
  @Column({ nullable: true, type: 'varchar', length: 255 })
  lastName: string;

  @Column({ nullable: true, type: 'varchar', length: 255 })
  profilePhoto: string;

  @Column({ nullable: true, unique: true, type: 'varchar', length: 255 })
  email: string;
  @Column({ type: 'varchar', length: 255 })
  password: string;
  @Column({ default: false, type: 'boolean' })
  emailVerified: boolean;

  @Column({ default: false, type: 'boolean' })
  phoneVerified: boolean;

  @Column({ nullable: true, type: 'varchar', length: 255, unique: true })
  phoneNumber: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  birthDate: Date;
  @Column({ nullable: true })
  nationalId: string;

  @Column({
    nullable: false,
    default: UserType.WORKER,
    type: 'enum',
    enum: UserType,
  })
  userType: UserType;
  @ManyToMany(() => Chat, (chat) => chat , {onDelete:'CASCADE'} )
  chats: Chat[];
  @OneToMany(() => Message, (message) => message.sender)
  sentMessages: Message[];

  @Column({ default: true })
  userApproved: boolean;

  @OneToMany(() => UserSavedJob, (savedJob) => savedJob.user)
  savedJobs: UserSavedJob[];
  @OneToMany(() => UserSavedAdvertise, (savedAdvertise) => savedAdvertise.user )
  savedAdvertises: UserSavedAdvertise[];
  @Column({default:false})
  isAdmin:boolean
  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = v4();
    }
  }
}
