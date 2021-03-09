import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { BaseComponent } from './components/base/base.component';
import { SliderComponent } from './components/slider/slider/slider.component';
import { SliderItemComponent } from './components/slider/slider-item/slider-item.component';



@NgModule({
  declarations: [
    BaseComponent,
    SliderComponent,
    SliderItemComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    // Components
    BaseComponent,
    SliderComponent,
    SliderItemComponent,
    // Modules
    HttpClientModule
  ]
})
export class SharedModule { }
