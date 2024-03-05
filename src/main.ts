import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  const config = new DocumentBuilder()
    .setTitle('simple-e-commerce-app')
    .setDescription('simple-e-commerce-app API description')
    .setVersion('1.0')
    .addTag('simple-e-commerce-app')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port, () =>
    console.log(`your app is running on port ${port}`),
  );
}

bootstrap();
