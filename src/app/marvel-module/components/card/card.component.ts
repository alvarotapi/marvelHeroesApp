import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
} from '@angular/core';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { Hero } from '../../interfaces/hero.interface';

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
  public hero = input.required<Hero>();

  // TODO: Crear pipe para construir la imagen
  public imgBuilder(path: string, extension: string): string {
    return `${path}.${extension}`;
  }

  // TODO: Implements moreDetails function
  moreDetails() {}
}
