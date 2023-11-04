import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: [
      'http://localhost:3000',
      'https://localhost:3000/',
      'https://localhost:3000',
      'https://user321990721-5heyvzbn.wormhole.vk-apps.com',
      'https://user321990721-ymmcqhsg.wormhole.vk-apps.com',
      'https://user321990721-cwikbaak.wormhole.vk-apps.com',
      'https://user321990721-mbdtheci.wormhole.vk-apps.com',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(3002);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
