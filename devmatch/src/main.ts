import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // activates the DTO rules (pipes) before any req reaches the controller
  app.useGlobalPipes(new ValidationPipe({
    // blocks extra data not in the DTOs
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
