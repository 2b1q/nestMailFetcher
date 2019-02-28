import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';

@Injectable()
export class RpcClientService implements OnModuleInit {
  // add RPC transport client
  @Client({ transport: Transport.REDIS })
  client: ClientProxy;

  // test
  private counter: number = 0;

  // module initialization hook
  async onModuleInit() {
    // Connect your client to the redis server on startup.
    await this.client.connect();
    this.logger.warn(
      `onModuleInit hook initialized => client connected to Redis server`,
    );

    // test RPC TX
    setInterval(() => {
      this.counter++;
      // send RPC CMD from service
      this.txRpc(
        { cmd: 'pong' },
        {
          fromService: 'nestMail.fetcher.RpcClientService',
          payload: this.counter,
        },
      );
    }, 3000);
  }

  // RPC message sender wrapper
  async txRpc(pattern: any, data: any) {
    this.logger.log(
      `
      Send data: ${JSON.stringify(data)}
      to message handler pattern ${JSON.stringify(pattern)}`,
    );
    // Send data to all listening to product_created
    await this.client.send(pattern, data).toPromise();
  }

  // add logger behavior
  private logger = new Logger('RpcClientService');
}
