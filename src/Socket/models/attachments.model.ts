import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  BeforeInsert,
  PrimaryColumn,
} from 'typeorm';
import { Message } from './message.model';
import { v4 } from 'uuid';
import { BaseEntity } from 'shared/shared.entity';

@Entity('attachments')
export class Attachment extends BaseEntity{
  @PrimaryColumn()
  id: string;
  @Column({ type: 'uuid' })
  messageId: string;
  @ManyToOne(() => Message, (message) => message.attachments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'messageId' })
  message: Message;

  @Column()
  filename: string;

  @Column()
  url: string; // e.g. path or external URL

  
  @BeforeInsert()
    generateId() {
      if (!this.id) {
        this.id = v4();
      }
    }
}
