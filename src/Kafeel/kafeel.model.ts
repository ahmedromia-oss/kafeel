import { User } from 'src/User/user.model';
import { BeforeInsert, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
@Entity()
export class kafeel {
  @PrimaryColumn({ type: 'uuid' })
  userId: string;
  @OneToOne(() => User, { nullable: false, eager: true})
  @JoinColumn({name:'userId'})
  user: User;
 
   
  
}
