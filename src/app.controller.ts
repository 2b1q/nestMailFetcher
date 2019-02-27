import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'ping' })
  ping(data: any): string {
    Logger.warn(
      `got cmd ping with data ${JSON.stringify(data)}`,
      `AppController`,
    );
    return 'pong';
  }
}
