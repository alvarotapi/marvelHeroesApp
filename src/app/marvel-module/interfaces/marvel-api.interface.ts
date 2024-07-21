import { Comics, TextObject, Thumbnail } from './character-comic.interface';

export interface CharacterApiResponse {
  code: number;
  data: {
    count: number;
    limit: number;
    offset: number;
    total: number;
    results: CharacterApiResult[];
  };
}

export interface CharacterApiResult {
  comics: Comics;
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

export interface ComicApiResponse {
  code: number;
  data: {
    count: number;
    limit: number;
    offset: number;
    total: number;
    results: ComicApiResult[];
  };
}

export interface ComicApiResult {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: TextObject[];
  thumbnail: Thumbnail;
}
