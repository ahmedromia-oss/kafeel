import { UserType } from 'src/constants';
import { Worker } from 'src/Worker/worker.model';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: true, type: 'text' })
  firstName: string;

  @Column({ nullable: true, type: 'text' })
  lastName: string;

  @Column({ nullable: true, type: 'text' })
  profilePhoto: string;

  @Column({ nullable: false, unique: true, type: 'text' })
  email: string;
  @Column({ type: 'text' })
  password: string;
  @Column({ default: false, type: 'boolean' })
  emailVerified: boolean;

  @Column({ default: false, type: 'boolean' })
  phoneVerified: boolean;

  @Column({ nullable: false, type: 'text' })
  phoneNumber: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  birthDate: Date;
  @Column({ nullable: false, default: '30128489520460' })
  nationalId: string;

  @Column({nullable:false , default:UserType.WORKER , type:'enum' , enum:UserType})
  userType:UserType
}
