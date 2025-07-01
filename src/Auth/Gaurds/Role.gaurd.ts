import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Code } from "../../constants";


import { userToken } from "src/models/userToken.model";
import { ROLE_KEY } from "../Decorators/Roles.decorator";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    

    const requiredRoles= this.reflector.getAllAndOverride<string[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const user:userToken= context.switchToHttp().getRequest().user.data;
    console.log(user)
   if(requiredRoles.includes(user.type)){
    
    return true
   }
   throw new ForbiddenException();

  }
}