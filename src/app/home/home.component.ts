import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../shared/components/base/base.component';
import { AnimeService } from '../shared/services/anime/anime.service';
import { Utils } from '../shared/services/utils/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {
  topAiringAnime: any[] = [];

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
        this.topAiringAnime = result.top;
      })
    });
  }
}
