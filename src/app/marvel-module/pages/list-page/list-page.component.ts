import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { MarvelService } from '../../services/marvel.service';
import { CardComponent } from '../../components/card/card.component';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: ` @for (hero of heroes(); track hero.id) {
    <app-card [hero]="hero" />
    }`,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPageComponent {
  public heroes = signal<Hero[]>([
    {
      id: 1,
      name: 'string',
      description: 'string',
      thumbnail: {
        path: 'https://i.annihil.us/u/prod/marvel/i/mg/6/20/52602f21f29ec',
        extension: 'jpg',
      },
    },
    {
      id: 2,
      name: 'string',
      description: 'string',
      thumbnail: {
        path: 'https://i.annihil.us/u/prod/marvel/i/mg/6/20/52602f21f29ec',
        extension: 'jpg',
      },
    },
    {
      id: 3,
      name: 'string',
      description: 'string',
      thumbnail: {
        path: 'https://i.annihil.us/u/prod/marvel/i/mg/6/20/52602f21f29ec',
        extension: 'jpg',
      },
    },
    {
      id: 4,
      name: 'string',
      description: 'string',
      thumbnail: {
        path: 'https://i.annihil.us/u/prod/marvel/i/mg/6/20/52602f21f29ec',
        extension: 'jpg',
      },
    },
  ]);

  constructor(private marvelService: MarvelService) {
    this.marvelService.getHeroes().subscribe((result) => {
      console.log(result);
    });
  }
}
