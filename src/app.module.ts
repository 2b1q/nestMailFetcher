import { Module } from '@nestjs/common';
import { RpcController } from './rpcController';
import { RpcClientService } from './rpc-client.service';
import { PulseService } from './pulse/pulse.service';
import { ServiceInteraction } from './shared/ipc';

@Module({
  imports: [],
  controllers: [RpcController],
  providers: [RpcClientService, PulseService, ServiceInteraction],
})
export class AppModule {}
