import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from './shared/components/base/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent extends BaseComponent implements OnInit {

  constructor(
  ) {
    super();
  }

  title = 'YAMAL - Yet Another Anime & Manga List';

  ngOnInit(): void {
  }

}
