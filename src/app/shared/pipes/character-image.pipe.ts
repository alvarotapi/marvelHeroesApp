import { Pipe, type PipeTransform } from '@angular/core';
import { Character } from '../../marvel-module/interfaces/character.interface';

@Pipe({
  name: 'characterImage',
  standalone: true,
})
export class CharacterImagePipe implements PipeTransform {
  transform(character: Character): string {
    if (!character.id) return 'assets/no-image.png';

    return `${character.thumbnail.path}.${character.thumbnail.extension}`;
  }
}
