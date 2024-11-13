import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorResponseInterceptor } from './error-response/error-response.interceptor';
import { SuccessResponseInterceptor } from './success-response/success-response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ErrorResponseInterceptor());
  app.useGlobalInterceptors(new SuccessResponseInterceptor());

  // Swagger 설정
  const options = new DocumentBuilder()
    .setTitle('Open Franchise API List')
    .setDescription('Open Franchise API List')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document); // Swagger UI를 사용할 URL

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
