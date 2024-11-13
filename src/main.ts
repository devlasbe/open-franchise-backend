import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorResponseInterceptor } from './error-response/error-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ErrorResponseInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
