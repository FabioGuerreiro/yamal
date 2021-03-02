import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { INamedSubscription } from '../../models/named-subscriptions/named-subscription.model';
import { Utils } from '../../services/utils/utils.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  encapsulation: ViewEncapsulation.None
})
export class BaseComponent implements OnInit, OnDestroy {

  public subscriptions: INamedSubscription[] = [];

  constructor(
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.map((s) => {
      Utils.unsubscribeIfExists(s.name, this.subscriptions);
    });
  }

}
