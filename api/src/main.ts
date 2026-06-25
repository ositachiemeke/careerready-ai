import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import {
  SwaggerModule,
  DocumentBuilder,
} from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*
   * CORS
   */
  app.enableCors({
    origin: true,
    credentials: true,
  });

  /*
   * API Versioning
   *
   * Example:
   * /v1/assessment-types
   */
  app.enableVersioning({
    type: VersioningType.URI,
  });

  /*
   * Validation
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  /*
   * Swagger
   */
  const config = new DocumentBuilder()
    .setTitle('CareerReady AI API')
    .setDescription(
      'API for CareerReady AI Graduate Assessment Preparation Platform',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(
    app,
    config,
  );

  SwaggerModule.setup(
    'docs',
    app,
    document,
  );

  const port = process.env.PORT || 3000;

  app.setGlobalPrefix('api');

  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port);

  console.log(
    `🚀 CareerReady API running on port ${port}`,
  );
}

bootstrap();