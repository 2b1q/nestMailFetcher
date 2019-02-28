import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class RpcClientService implements OnModuleInit {
  onModuleInit() {
    this.logger.warn(`onModuleInit hook initialized`);
  }

  private logger = new Logger('RpcClientService');
}
