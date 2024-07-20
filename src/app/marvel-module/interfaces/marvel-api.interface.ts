import { Thumbnail } from './character.interface';

export interface MarvelApiResponse {
  data: {
    count: number;
    limit: number;
    offset: number;
    total: number;
    results: MarvelApiResult[];
  };
}

export interface MarvelApiResult {
  comics: {};
  description: string;
  events: {};
  id: number;
  modified: string;
  name: string;
  resourceURI: string;
  series: {};
  stories: {};
  thumbnail: Thumbnail;
  urls: {}[];
}
