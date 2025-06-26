import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { ResponseExceptionFilter } from 'shared/Filters/ExceptionFilter';

import { I18nService } from 'nestjs-i18n';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const i18n = app.get(I18nService) as I18nService<Record<string, unknown>>;

  app.useGlobalFilters(new ResponseExceptionFilter(i18n));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory(errors: ValidationError[]) {
        return new BadRequestException(errors);
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
