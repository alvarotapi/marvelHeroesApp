import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { MarvelService } from '../../services/marvel.service';
import { CardComponent } from '../../components/card/card.component';
import { Character } from '../../interfaces/character.interface';
import { MarvelApiResponse } from '../../interfaces/marvel-api.interface';
import { ButtonModule } from 'primeng/button';
import { LoadingService } from '../../../shared/services/loading.service';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [CommonModule, CardComponent, LoadingComponent, ButtonModule],
  templateUrl: './list-page.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPageComponent {
  protected readonly characters = signal<Character[]>([]);
  private totalCharacters: number = 0;
  private currentPage: number = 0;
  private pageSize: number = 20;

  private getPaginatedCharactersSubscription?: Subscription;

  constructor(
    private marvelService: MarvelService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.loadCharacters();
  }

  ngOnDestroy(): void {
    this.getPaginatedCharactersSubscription?.unsubscribe();
  }

  loadCharacters(page: number = 0) {
    this.loadingService.showSpinner();
    this.getPaginatedCharactersSubscription = this.marvelService
      .getPaginatedCharacters(this.pageSize, page * this.pageSize)
      .subscribe({
        next: (resp: MarvelApiResponse) => {
          this.totalCharacters = resp.data.total;
          this.currentPage = page;

          resp.data.results.forEach((result) => {
            this.characters.update((oldCharacters) => {
              return [...oldCharacters, result];
            });
          });

          this.loadingService.hideSpinner();
        },
        error: (error) => {
          this.loadingService.hideSpinner();
          throw new Error('Error fetching characters:', error);
        },
      });
  }

  nextPage() {
    if ((this.currentPage + 1) * this.pageSize < this.totalCharacters) {
      this.loadCharacters(this.currentPage + 1);
    }
  }

  loaded(id: number) {
    if (
      this.characters().length < this.totalCharacters &&
      this.characters().at(-2)?.id === id
    ) {
      // TODO: Remove commentaries
      // this.loadCharacters(this.characters().length / this.pageSize);
      this.nextPage();
    }
  }
}
