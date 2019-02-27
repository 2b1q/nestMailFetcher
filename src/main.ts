import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { Logger } from '@nestjs/common';

const url = 'redis://localhost:6379';

async function bootstrap() {
  /**
   * basic microservice with NestFactory.createMicroservice():
   */
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.REDIS,
    options: {
      url,
      retryAttempts: 5,
      retryDelay: 3000,
    },
  });

  // WakeUP service
  app
    .listenAsync()
    .then(() => {
      Logger.warn(`Redis RPC Microservice is hooked up to ${url}`, 'Bootstrap');
    })
    .catch(e => {
      Logger.error(e, '', 'Bootstrap');
    });
}
bootstrap();
