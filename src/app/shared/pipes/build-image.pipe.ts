import { Pipe, type PipeTransform } from '@angular/core';
import {
  Character,
  Comic,
} from '../../marvel-module/interfaces/character-comic.interface';

@Pipe({
  name: 'buildImage',
  standalone: true,
})
export class BuildImagePipe implements PipeTransform {
  transform(character: Character | Comic): string {
    if (!character.id) return 'assets/no-image.png';

    return `${character.thumbnail.path}.${character.thumbnail.extension}`;
  }
}
