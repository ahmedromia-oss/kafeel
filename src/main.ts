import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { ResponseExceptionFilter } from 'shared/Filters/ExceptionFilter';
import { AuthModule } from './Auth/auth.module';
import { UserModule } from './User/user.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new ResponseExceptionFilter());
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
