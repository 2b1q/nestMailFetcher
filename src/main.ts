import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    transport: Transport.REDIS,
    options: {
      url: 'redis://localhost:6379',
    },
  });
  // Logger.log('Microservice is listening', 'Bootstrap');
  // app.listen(() => console.log('Microservice is listening'));

  // await app.listen();
  // app
  //   .listen(5555)
  //   .then(() => {
  //     Logger.log(`Microservice is listening `, 'Bootstrap');
  //   })
  //   .catch(e => Logger.error(e, '', 'bootstrap'));
}
bootstrap();
