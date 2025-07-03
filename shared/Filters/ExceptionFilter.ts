import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { response, Response } from 'express';
import { Code } from '../../src/constants';
import { ServiceResponse } from 'src/models/response.model';
import { QueryFailedError } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { WsException } from '@nestjs/websockets';

@Catch()
export class ResponseExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}

  catch(exception: any, host: ArgumentsHost) {
    const type = host.getType();
    if (type === 'ws') {
      const client = host.switchToWs().getClient();

      // Handle socket-specific errors

      client.emit('error', {
        message: 'Connection error occurred',
      });
      return;
    } else {
      const context = host.switchToHttp();
      const response = context.getResponse<Response>();
      const req = context.getRequest<Request>();
      const lang = (req.headers['accept-language'] as string) || 'en';
      try {
        var obj = {};

        exception['response']['message'].map((e) => {
          obj[
            this.i18n.translate(`common.${e['property']}`, {
              lang: lang,
            }) as string
          ] = this.i18n.translate(
            `common.${Object.values(e['constraints'])[0]}`,
            { lang },
          );
        });
        const errorResponse = {
          code: Code.BAD_INPUT,
          Errors: obj,
        } as ServiceResponse<Object>;
        return response.status(400).json(errorResponse);
      } catch {
        console.log(exception);
        if (exception instanceof QueryFailedError) {
          return response.status(400).json({ code: Code.SMTH_WITH_DB });
        }
      }
      if (exception instanceof NotFoundException) {
        return response
          .status(404)
          .json({ code: this.i18n.translate(`common.${Code.NOT_FOUND}`) });
      }
      if (exception instanceof ForbiddenException) {
        return response.status(403).json(() => {
          if (exception.message != Code.UN_VERIFIED) {
            return response.status(403).json({ Code: Code.FORBIDDEN });
          } else {
            return response.status(403).json({ Code: Code.UN_VERIFIED });
          }
        });
      }
      if (exception instanceof UnauthorizedException) {
        return response.status(401).json({ Code: Code.UN_AUTORIZED });
      }
      return response.status(400).json({
        code: this.i18n.translate(`common.${exception.message}`, {
          lang: lang,
        }),
      });
    }
  }
}
