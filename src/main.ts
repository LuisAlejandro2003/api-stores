// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Aquí se agrega el prefijo `api` antes de `v1` para todas las rutas
  app.setGlobalPrefix('api/v1');

  await app.listen(3000);
}
bootstrap();
