import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '../shared/components/base/base.component';
import { SliderItem } from '../shared/models/named-subscriptions/slider-item.model';
import { AnimeService } from '../shared/services/anime/anime.service';
import { Utils } from '../shared/services/utils/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent extends BaseComponent implements OnInit {
  topAiringAnime: SliderItem[];

  constructor(
    private animeSrv: AnimeService
  ) {
    super();
  }

  title = 'yamal';

  ngOnInit(): void {
    this.getTopAiringAnime();
  }

  getTopAiringAnime() {
    Utils.unsubscribeIfExists('getTopAiringAnime', this.subscriptions);
    this.subscriptions.push({
      name: 'getTopAiringAnime',
      subscription: this.animeSrv.getTopAiringAnime().subscribe((result: any) => {
        this.topAiringAnime = [];
        result.top.map((anime: any, i: number) => {
          if (i < 10) {
            const newItem = new SliderItem(anime.title, anime.image_url);
            newItem.score = anime.score;
            this.topAiringAnime.push(newItem);
          }
        });
      })
    });
  }
}
