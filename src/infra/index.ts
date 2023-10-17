import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AvailableAlgorithms } from 'domain/algorithms/AvailableAlgorithms';

import { AppModule } from './app.module';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Dungeon world')
    .setDescription(
      `API provides access to dungeons. You can CRUD them. API can generate dungeon scheme via ${Object.keys(
        AvailableAlgorithms,
      ).join(', ')} algorithms.`,
    )
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  const port = app.get(ConfigService).get('PORT');
  await app.listen(port);

  return port;
}
