import { Subscription } from 'rxjs';

export interface INamedSubscription {
  name: string;
  subscription: Subscription;
}
