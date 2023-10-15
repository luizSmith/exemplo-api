import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CustomValidationPipe } from './infraestructure/pipes/customValidation.pipe';
import { CustomErrorInterceptor } from './infraestructure/interceptors/errorHandler/errorHandler.interceptor';
import { HttpExceptionFilter } from './infraestructure/interceptors/errorHandler/customError.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Api Series')
    .setDescription('Teste FATEC')
    .setVersion('1.0')
    .addTag('CRUD')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalInterceptors(new CustomErrorInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
