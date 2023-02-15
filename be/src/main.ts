import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './errors/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import configuration from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'log', 'verbose', 'warn'],
  });

  const config = configuration();

  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(config.APP_VERSION);
  app.enableCors({
    origin: ['http://localhost:3000'],
    maxAge: 3600,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  });

  const configSwagger = new DocumentBuilder()
    .setBasePath(config.APP_VERSION)
    .setTitle('Todolist API')
    .setDescription('The Todolist API description')
    .setVersion('1.0')
    .addTag('Todolist')
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);

  SwaggerModule.setup('api', app, document);
  await app.listen(config.PORT || 3000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
