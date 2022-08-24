import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const env_cors = process.env.ORIGINS_CORS
const origin = env_cors.split(" , ")

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }))
  app.enableCors({
    origin: origin,
    methods: ['GET', 'POST', 'UPDATE', 'DELETE', 'PUT'],
  });
  const PORT = process.env.PORT ?? 5000;
  await app.listen(PORT);
}
bootstrap();
