import { User } from 'src/User/models/user.model';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Message } from './message.model';
import { v4 } from 'uuid';
import { BaseEntity } from 'shared/shared.entity';

@Entity('chats')
export class Chat extends BaseEntity {
  @PrimaryColumn()
  id: string;

  // Members of the chat (for solo chat length = 2)
  @ManyToMany(() => User, (user) => user.chats, {onDelete:'CASCADE' ,  eager: true })
  @JoinTable()
  members: User[];

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];
  @OneToOne(() => Message, { nullable: true })
  @JoinColumn({ name: 'lastMessageId' }) // custom FK column name
  lastMessage: Message;
  @Column({nullable:true})
  lastMessageId:string

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = v4();
    }
  }
}
