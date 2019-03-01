import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ServiceInteraction } from '../shared/ipc';
import { interval } from 'rxjs';

@Injectable()
export class PulseService implements OnModuleInit {
  constructor(private serviceInteraction: ServiceInteraction) {}

  onModuleInit() {
    Logger.warn(`initialized`, `PulseService`);
    this.serviceInteraction.$event = interval(1000);
  }
}
