import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class RpcController {
  // Handle RPC cmd: 'ping'
  @MessagePattern({ cmd: 'ping' })
  ping(data: any) {
    Logger.warn(
      `got cmd ping with data ${JSON.stringify(data)}`,
      `AppController`,
    );
  }
}
