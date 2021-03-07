import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './components/base/base.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    BaseComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    BaseComponent,
    HttpClientModule
  ]
})
export class SharedModule { }
