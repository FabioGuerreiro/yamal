
export interface ISliderItem {
  title: string;
  imageUrl: string;
  type?: string;
  rank?: number;
  score?: number;
}

export class SliderItem implements ISliderItem {
  title: string;
  imageUrl: string;
  type?: string;
  rank?: number;
  score?: number;

  constructor(title: string, imageUrl: string) {
    this.title = title;
    this.imageUrl = imageUrl;
  }
}
