import { User } from 'src/User/user.model';
import { JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
export class kafeel {
  @PrimaryColumn({ type: 'uuid' })
  userId: string;
  @OneToOne(() => User, { nullable: false, eager: true})
  @JoinColumn({name:'userId'})
  user: User;
}
