export interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: Thumbnail;
  comics: Comics;
}

export interface Thumbnail {
  path: string;
  extension: string;
}

export interface Comics {
  items: ComicItems[];
}

export interface ComicItems {
  resourceURI: string;
  name: string;
}

export interface Comic {
  id: number;
  title: string;
  issueNumber: number;
  description: string;
  pageCount: number;
  textObjects: TextObject[];
  thumbnail: Thumbnail;
}

export interface TextObject {
  type: string;
  language: string;
  text: string;
}
