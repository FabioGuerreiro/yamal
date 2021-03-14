import { Component, ElementRef, HostBinding, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { ISliderItem } from '../../../models/named-subscriptions/slider-item.model';
import { Utils } from '../../../services/utils/utils.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SliderComponent extends BaseComponent implements OnInit, OnChanges {
  @Input() items: ISliderItem[];

  @HostBinding('class') classes = 'yamal-slider-container';

  @ViewChild('container') container : ElementRef;

  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName) && Utils.isDefined(this.items)) {
        if (propName === 'items') {
          this.arrangeItems();
          setTimeout(() => {
            this.setMargin();
          });
        }
      }
    }
  }

  private setMargin() {
    (this.container.nativeElement as HTMLElement).style.marginLeft = `-${this.container.nativeElement.offsetWidth / 2}px`;
  }

  private arrangeItems() {
    if (Utils.isDefined(this.items)) {
      this.onItemSelect(this.items[0]);
    }
  }

  onNavigate(event: any, item: ISliderItem) {
    let index;

    switch (event as string) {
      case 'next': {
        index = this.items.indexOf(item) + 1;
        break;
      }
      case 'prev': {
        index = this.items.indexOf(item) - 1;
        break;
      }
      default: {
        // unknown
      }
    }

    if (Utils.isDefined(index)) {
      this.onItemSelect(this.items[index as number]);
    }
  }

  onItemSelect(item: ISliderItem) {
    const middle = Math.round(this.items.length / 2) - 1;

    const selectedElement = item;
    let selectedIndex = this.items.indexOf(selectedElement);

    while (selectedIndex !== middle) {
      const lastItem = this.items.splice(this.items.length - 1, 1);
      this.items.unshift(lastItem[0]);

      selectedIndex = this.items.indexOf(selectedElement);
    }

    this.items.map((it) => it.selected = false);

    item.selected = true;
  }

}
