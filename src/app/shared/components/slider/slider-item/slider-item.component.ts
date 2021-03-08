import { Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ISliderItem } from 'src/app/shared/models/named-subscriptions/slider-item.model';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-slider-item',
  templateUrl: './slider-item.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SliderItemComponent extends BaseComponent implements OnInit {
  @Input() item: ISliderItem;

  @HostBinding('class') classes = 'yamal-slider-item';

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
