import {
  Entity,
  
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  BeforeInsert,
  PrimaryColumn,
} from 'typeorm';
import { Chat } from './chat.model';
import { User } from 'src/User/user.model';
import { Attachment } from './attachments.model';
import { MessageType } from 'src/constants';
import { v4 } from 'uuid';

@Entity('messages')
export class Message {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Chat, (chat) => chat.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chatId' })
  chat: Chat;
  @Column({ type: 'uuid' })
  chatId: string;

  @ManyToOne(() => User, (user) => user, { onDelete: 'SET NULL'})
  @JoinColumn({ name: 'userId' })
  sender: User;

  @Column({ type: 'uuid' , nullable:true })
  userId: string;

  @Column('text')
  content: string;

  @Column({ type: 'enum', enum: MessageType, default: MessageType.TEXT })
  messageType: MessageType;

  @OneToMany(() => Attachment, (attachment) => attachment.message)
  attachments: Attachment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = v4();
    }
  }
  
}
