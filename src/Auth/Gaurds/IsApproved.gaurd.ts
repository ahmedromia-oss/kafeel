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
export class IsApprovedGaurd implements CanActivate {
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
    if (requiredpermission.includes(PERMISSION.IS_APPROVED)) {
      if (user.Approved) {
        return true;
      }
      throw new ForbiddenException({ code: Code.UN_APPROVED });
    }
    return true;
  }
}
