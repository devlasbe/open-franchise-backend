import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorResponseInterceptor } from './error-response/error-response.interceptor';
import { SuccessResponseInterceptor } from './success-response/success-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ErrorResponseInterceptor());
  app.useGlobalInterceptors(new SuccessResponseInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
