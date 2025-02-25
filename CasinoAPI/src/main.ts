import './instrument';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const DEFAULT_APP_PORT = 3000;
  const app = await NestFactory.create(AppModule, { cors: true });

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Casino API')
      .setDescription('The casino API description')
      .setVersion('1.0')
      .addTag('casino')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);
  }

  await app.listen(process.env.PORT ?? DEFAULT_APP_PORT);
}
bootstrap();
