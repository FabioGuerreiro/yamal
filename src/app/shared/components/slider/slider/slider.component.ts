import { Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ISliderItem } from '../../../models/named-subscriptions/slider-item.model';
import { Utils } from '../../../services/utils/utils.service';
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

  onItemClick(item: ISliderItem) {
    const filterd = this.items.filter((it) => it === item);

    if (filterd.length > 0) {
      if (filterd[0].selected !== true) {
        this.onItemSelect(filterd[0]);
      }
    }
  }

  onItemSelect(item: ISliderItem) {
    this.items.map((it) => it.selected = false);

    item.selected = true;
  }

}
