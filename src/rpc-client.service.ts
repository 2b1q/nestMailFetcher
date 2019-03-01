import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ServiceInteraction } from './shared/ipc';
import { map } from 'rxjs/operators';

@Injectable()
export class RpcClientService implements OnModuleInit {
  // inject serviceInteraction dependencies
  constructor(private serviceInteraction: ServiceInteraction) {}

  // add RPC transport client
  @Client({ transport: Transport.REDIS })
  client: ClientProxy;

  // RedisRPC sender Observable
  private sender: Observable<any>;

  // Msg counter
  private counter: number = 0;

  // Msg RPC msg wrapper
  private emit(payload: any) {
    // construct data payload
    const data = {
      fromService: 'nestMail.fetcher.RpcClientService',
      payload: payload || this.counter,
    };
    // add RPC msg pattern
    const pattern = { cmd: 'pong' };
    // log RPC.send data
    this.logger.warn(
      `Send ${JSON.stringify({
        payload: data.payload,
      })} MsgPattern ${JSON.stringify(pattern)}`,
    );
    // hook up RPC client Observer
    this.sender = this.client.send(pattern, data);
    // subscribe to event => send RPC msg
    // () => handle next (RPC response)
    // () => handle Errors
    // () => handle Observer complete
    this.sender.subscribe(
      next => this.logger.log(`next observer data: ${JSON.stringify(next)}`),
      err => this.logger.error(`err observer handler: ${JSON.stringify(err)}`),
      () => this.logger.warn(`complete observer handler ${++this.counter}`),
    );
  }

  // module initialization hook
  async onModuleInit() {
    // Connect your client to the redis server on startup.
    await this.client.connect();
    this.logger.warn(
      `onModuleInit hook initialized => client connected to Redis server`,
    );

    // emit RPC msg every 2000ms
    // setInterval(() => this.emit(), 2000);

    //  subscribe to events from pulseService trough serviceInteraction event Observable
    this.serviceInteraction.$event
      .pipe(
        map((value, index) =>
          Object({
            msg: 'HeartBeat pulse',
            from: 'nestMail.fetcher.RpcClientService',
            streamValue: value,
            mapIndex: index,
          }),
        ),
      )
      .subscribe(
        next => {
          this.logger.log(`$stream data from pulseService`);
          this.emit(next);
        },
        error =>
          this.logger.error(
            error,
            '',
            'RpcClientService => onModuleInit => serviceInteraction.event.subscribe',
          ),
        () => {},
      );
  }

  // RPC message sender wrapper (with Promise)
  async txRpc(pattern: any, data: any) {
    // Send data to all listening to product_created
    await this.client.send(pattern, data).toPromise();
  }

  // add logger behavior
  private logger = new Logger('RpcClientService');
}
