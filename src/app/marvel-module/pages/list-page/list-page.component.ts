import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { MarvelService } from '../../services/marvel.service';
import { CardComponent } from '../../components/card/card.component';
import { Character } from '../../interfaces/character.interface';
import { MarvelApiResponse } from '../../interfaces/marvel-api.interface';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonModule],
  template: ` <p-button label="More..." (onClick)="this.nextPage()" />

    @for (character of characters(); track character.id) {
    <app-card [character]="character" />
    }`,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPageComponent {
  characters = signal<Character[]>([]);
  totalCharacters: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;

  constructor(private marvelService: MarvelService) {}

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters(page: number = 0) {
    this.marvelService
      .getPaginatedCharacters(this.pageSize, page * this.pageSize)
      .subscribe({
        next: (resp: MarvelApiResponse) => {
          this.totalCharacters = resp.data.total;
          this.currentPage = page;

          resp.data.results.forEach((result) => {
            this.characters.update((characters) => {
              return [...characters, result];
            });
          });
        },
        error: (error) => {
          throw new Error('Error fetching characters:', error);
        },
      });
  }

  nextPage() {
    if ((this.currentPage + 1) * this.pageSize < this.totalCharacters) {
      this.loadCharacters(this.currentPage + 1);
    }
  }
}
