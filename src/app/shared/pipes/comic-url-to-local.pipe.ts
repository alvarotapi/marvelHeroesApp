import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'comicUrlToLocal',
  standalone: true,
})
export class ComicUrltoLocalPipe implements PipeTransform {
  transform(url: string): string {
    const parts = url.split('/');

    return `/comic/${parts[parts.length - 1]}`;
  }
}
