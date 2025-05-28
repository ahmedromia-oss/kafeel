import { User } from 'src/User/user.model';
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
} from 'typeorm';
import { Message } from './message.model';
import { v4 } from 'uuid';


@Entity('chats')
export class Chat {
  @PrimaryColumn()
  id: string;

  // Members of the chat (for solo chat length = 2)
  @ManyToMany(() => User, (user) => user.chats)
  @JoinTable()
  members: User[];

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];

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
