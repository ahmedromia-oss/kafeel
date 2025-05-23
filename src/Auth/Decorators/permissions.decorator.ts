import { SetMetadata } from '@nestjs/common';
import { PERMISSION } from 'src/constants';


export const PERMISSION_KEY = 'permissions';
export const permissions = (...permissions: PERMISSION[]) => SetMetadata(PERMISSION_KEY, permissions);