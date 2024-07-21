import { Pipe, type PipeTransform } from '@angular/core';
import {
  Character,
  Comic,
} from '../../features/marvel/interfaces/character-comic.interface';

@Pipe({
  name: 'buildImage',
  standalone: true,
})
export class BuildImagePipe implements PipeTransform {
  transform(character: Character | Comic): string {
    return `${character.thumbnail.path}.${character.thumbnail.extension}`;
  }
}
