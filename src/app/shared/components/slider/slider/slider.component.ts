import { Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ISliderItem } from 'src/app/shared/models/named-subscriptions/slider-item.model';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SliderComponent extends BaseComponent implements OnInit {
  @Input() items: ISliderItem[];

  @HostBinding('class') classes = 'yamal-slider';

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
