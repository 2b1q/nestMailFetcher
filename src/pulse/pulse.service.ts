import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ServiceInteraction } from '../shared/ipc';
import { interval } from 'rxjs';

@Injectable()
export class PulseService implements OnModuleInit {
  constructor(private serviceInteraction: ServiceInteraction) {}

  onModuleInit() {
    const period: number = 4000;
    Logger.warn(
      `Observable interval.$stream initialized with period ${period}`,
      `PulseService`,
    );
    this.serviceInteraction.$event = interval(period);
  }
}
