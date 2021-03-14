import { Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
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
  @HostBinding('class.selected') public get isSelected(): boolean {
    return this.item.selected === true;
  }

  @Output() navigate: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  onNavigate(direction: 'prev'|'next') {
    this.navigate.emit(direction);
  }

}
