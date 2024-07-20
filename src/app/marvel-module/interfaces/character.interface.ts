export interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: Thumbnail;
}

export interface Thumbnail {
  path: string;
  extension: string;
}
