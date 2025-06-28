import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { ResponseExceptionFilter } from 'shared/Filters/ExceptionFilter';

import { I18nService } from 'nestjs-i18n';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const i18n = app.get(I18nService) as I18nService<Record<string, unknown>>;
  const staticPath = join(__dirname, '..', 'uploads');
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

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
