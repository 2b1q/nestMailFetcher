import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class RpcController {
  // Handle RPC cmd: 'ping'
  @MessagePattern({ cmd: 'ping' })
  ping(data: any) {
    Logger.log(
      `got cmd ping with data\n${JSON.stringify(data)}`,
      `AppController`,
    );
  }
}
