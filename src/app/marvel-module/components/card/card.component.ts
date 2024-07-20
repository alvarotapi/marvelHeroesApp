import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
} from '@angular/core';
import { Router } from '@angular/router';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './card.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  public character = input.required<Character>();

  constructor(private router: Router) {}

  // TODO: Crear pipe para construir la imagen
  public imgBuilder(path: string, extension: string): string {
    return `${path}.${extension}`;
  }

  moreDetails() {
    this.router.navigateByUrl(`/details/${this.character().id}`);
  }
}
