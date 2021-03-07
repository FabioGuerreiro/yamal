import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndPoints } from '../../endpoints';
import { BaseApiService } from '../base-api/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class AnimeService  extends BaseApiService {

  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  getTopAiringAnime(page: number = 1) {
    this.setApiRoot(EndPoints.jikanBase);
    return this.getAll(EndPoints.jikanTopAiringAnime(page));
    // .pipe(
    //   map((result) => {
    //     return result.data;
    //   })
    // );
  }

}
