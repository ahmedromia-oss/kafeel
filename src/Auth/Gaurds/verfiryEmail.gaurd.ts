import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Code, PERMISSION } from '../../constants';
import { UserService } from '../../User/user.service';
import { userToken } from 'src/models/userToken.model';
import { PERMISSION_KEY } from '../Decorators/permissions.decorator';

@Injectable()
export class verifyEmailGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredpermission = this.reflector.getAllAndOverride<PERMISSION[]>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredpermission) {
      return true;
    }
    const user: userToken = context.switchToHttp().getRequest();
    if (requiredpermission.includes(PERMISSION.IS_EMAIL_VERIFIED)) {
      if (user.verifyEmail) {
        return true;
      }
      throw new ForbiddenException({ code: Code.UN_VERIFIED });
    }
    return true;
  }
}
