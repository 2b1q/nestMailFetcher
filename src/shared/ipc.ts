import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ServiceInteraction {
  $event: Observable<any>; // public property event of type Observable $STREAM
}
