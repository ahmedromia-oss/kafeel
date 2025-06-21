import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';
import { Code } from 'src/constants';
import { ServiceResponse } from 'src/models/response.model';

export function serialize(dto?: any, groups?: string[]) {
  return UseInterceptors(new SerializeInterceptor(dto, groups));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any, private groups: string[]) {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data: any) => {
        if (data?.user?.userType && this.groups) {
          this.groups.push(data.user?.userType);
        }

        return {
          code: Code.SUCCESS,
          data: this.dto
            ? plainToInstance(this.dto,data, {
                excludeExtraneousValues: true,
                groups: this.groups,
              })
            : data,
        } as ServiceResponse<any>;
      }),
    );
  }
}
