import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'comicUrlToLocal',
  standalone: true,
})
export class ComicUrltoLocalPipe implements PipeTransform {
  transform(resourceURI: string, characterId: string | number): string {
    const resourceUriParts = resourceURI.split('/');

    return `/comic/${
      resourceUriParts[resourceUriParts.length - 1]
    }/character/${characterId}`;
  }
}
