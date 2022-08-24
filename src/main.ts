import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const env_cors = process.env.ORIGINS_CORS ?? null
const origin = env_cors ? env_cors.split(" , ") : "*"

console.log(origin)

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
