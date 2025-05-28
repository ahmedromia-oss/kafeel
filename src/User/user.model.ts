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

@Entity()
export class User {
  @PrimaryColumn()
  id: string;
  @Column({ nullable: true, type: 'varchar', length: 255})
  firstName: string;

  @Column({ nullable: true, type: 'varchar', length: 255})
  lastName: string;

  @Column({ nullable: true, type: 'varchar', length: 255})
  profilePhoto: string;

  @Column({ nullable: false, unique: true, type: 'varchar', length: 255})
  email: string;
  @Column({ type: 'varchar', length: 255})
  password: string;
  @Column({ default: false, type: 'boolean' })
  emailVerified: boolean;

  @Column({ default: false, type: 'boolean' })
  phoneVerified: boolean;

  @Column({ nullable: false, type: 'varchar', length: 255})
  phoneNumber: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  birthDate: Date;
  @Column({ nullable: false, default: '30128489520460' })
  nationalId: string;

  @Column({
    nullable: false,
    default: UserType.WORKER,
    type: 'enum',
    enum: UserType,
  })
  userType: UserType;
  @ManyToMany(() => Chat, (chat) => chat)
  chats: Chat[];
  @OneToMany(() => Message, (message) => message.sender)
  sentMessages: Message[];
  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = v4();
    }
  }
  
}
