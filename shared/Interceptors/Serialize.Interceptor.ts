import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';
import { Code } from 'src/constants';
import { ServiceResponse } from 'src/models/response.model';



export function serialize(dto?: any) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data: any) => {
        return {
          code:Code.SUCCESS,
          data:this.dto?plainToInstance(this.dto, data, {
            excludeExtraneousValues: true,
          }): data,
        } as ServiceResponse<any>;
      }),
    );
  }
}
