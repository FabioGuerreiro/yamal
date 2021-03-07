export class EndPoints {
  // Jikan api
  static jikanBase = 'https://api.jikan.moe/v3/';
  static jikanTopAiringAnime = (page: number) => `top/anime/${page}/airing`;
  static jikanTopManga = 'Top/manga';
  static jikanTopCharacters = 'Top/characters';
}
