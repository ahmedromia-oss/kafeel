import { SetMetadata } from '@nestjs/common';
import { UserType } from 'src/constants';


export const ROLE_KEY = 'Roles';
export const roles = (...roles: UserType[]) => SetMetadata(ROLE_KEY, roles);