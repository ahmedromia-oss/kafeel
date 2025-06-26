// src/common/interceptors/response-translate.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {  map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { translate } from '@vitalets/google-translate-api';
import { Code } from 'src/constants';
import { getCompanyDto } from 'src/company/DTOs/getCompany.dto';
import { I18nService } from 'nestjs-i18n';
import { from, Observable } from 'rxjs';

@Injectable()
export class ResponseTranslateInterceptor implements NestInterceptor {
  constructor(private readonly i18n: I18nService) {}
   intercept(
    ctx: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const req = ctx.switchToHttp().getRequest();
    const lang = (req.headers['accept-language'] as string) || 'en';
    return next.handle().pipe(
      tap(() => console.log('—pipe has started—')), 
      // mergeMap lets us await translations
      mergeMap((data: any) => {
        console.log(data)
        // 1) If top-level code === 'success', do nothing
        if (data?.code == Code.SUCCESS) {
          return data;
        }
        console.log(data);

        // 2) If there's a code string, translate it via common.<code>
        if (!data?.data) {
          data.code = this.i18n.translate(`common.${data.code}`, {
            lang:
              ctx.switchToHttp().getRequest().headers['accept-language'] ||
              'en',
          });
        }

        // 3) If there's an Errors object, translate its keys & string values
        if (data?.Errors) {
          console.log('hello world');
          const lang =
            ctx.switchToHttp().getRequest().headers['accept-language'] || 'en';
          const translatedErrors: Record<string, any> = {};
          for (const [rawKey, rawValue] of Object.entries(data.Errors)) {
            const tKey =  this.i18n.translate(`common.${rawKey}`, {
              lang,
            });
            let tVal = rawValue;
            if (typeof rawValue === 'string') {
              tVal =  this.i18n.translate(`common.${rawValue}`, { lang });
            }
            translatedErrors[tKey] = tVal;
          }
          data.Errors = translatedErrors;
        }

        return data;
      }),
      // Convert our async function (Promise) back into an Observable
      mergeMap((resolved) => from(Promise.resolve(resolved))),
    );
  }
}
