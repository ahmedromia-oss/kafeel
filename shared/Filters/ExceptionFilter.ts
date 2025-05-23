import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { Code } from '../../src/constants';
import { ServiceResponse } from 'src/models/response.model';
import { QueryFailedError } from 'typeorm';

@Catch()
export class ResponseExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    console.log(exception);
    try {
      var obj = {};

      exception['response']['message'].map((e) => {
        obj[e['property']] = Object.values(e['constraints'])[0];
      });
      const errorResponse = {
        code: Code.BAD_INPUT,
        Errors: obj,
      } as ServiceResponse<Object>;
      return response.status(400).json(errorResponse);
    } catch {
      if (exception instanceof QueryFailedError) {
        return response.status(400).json({ code: Code.SMTH_WITH_DB });
      }
    }
    if (exception instanceof NotFoundException) {
      return response.status(404).json({ code: Code.NOT_FOUND });
    }
    if(exception instanceof ForbiddenException){
      return response.status(403).json(()=>{
        if(exception.message != Code.UN_VERIFIED){
        return response.status(403).json ({Code:Code.FORBIDDEN})
        }
        else{
          return response.status(403).json ({Code:Code.UN_VERIFIED})
        }
      })
    }
    if(exception instanceof UnauthorizedException){
      return response.status(401).json({Code:Code.UN_AUTORIZED})
    }
    return response.status(400).json({ code: exception.message });
  }
}
