import { UserType } from 'src/constants';

export class userToken {
  sub: string;
  verifyEmail: boolean;
  verifyPhone: boolean;
  type: UserType;
  Approved: boolean;
  isAdmin:boolean
}
