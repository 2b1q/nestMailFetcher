import { Module } from '@nestjs/common';
import { RpcController } from './rpcController';
import { RpcClientService } from './rpc-client.service';

@Module({
  imports: [],
  controllers: [RpcController],
  providers: [RpcClientService],
})
export class AppModule {}
