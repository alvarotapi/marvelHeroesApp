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
  // TODO: Borrar available y collectionURI, si no lo llego a utilizar
  available: number;
  collectionURI: string;
  items: ComicItems[];
}

export interface ComicItems {
  resourceURI: string;
  name: string;
}
