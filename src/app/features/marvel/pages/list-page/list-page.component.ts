import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { MarvelService } from '../../services/marvel.service';
import { Character } from '../../interfaces/character-comic.interface';
import { CharacterApiResponse } from '../../interfaces/marvel-api.interface';
import { CardComponent } from '../../../../shared/components/list-card/list-card.component';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { ScrollButtonComponent } from '../../../../shared/components/scroll-button/scroll-button.component';
import { LoadingService } from '../../../../shared/services/loading.service';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    LoadingComponent,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ScrollButtonComponent,
  ],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPageComponent {
  protected readonly characters = signal<Character[]>([]);
  private totalCharacters: number = 0;
  private currentPage: number = 0;
  private pageSize: number = 12;

  public searchQuery: string = '';

  private getPaginatedCharactersSubscription?: Subscription;
  private getCharactersByNameStartsWithSubscription?: Subscription;

  constructor(
    private marvelService: MarvelService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.loadPaginatedCharacters();
  }

  ngOnDestroy(): void {
    this.getPaginatedCharactersSubscription?.unsubscribe();
    this.getCharactersByNameStartsWithSubscription?.unsubscribe();
  }

  loadPaginatedCharacters(page: number = 0) {
    this.loadingService.showSpinner();

    this.getPaginatedCharactersSubscription = this.marvelService
      .getPaginatedCharacters(this.pageSize, page * this.pageSize)
      .subscribe({
        next: (resp: CharacterApiResponse) => {
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
      this.loadPaginatedCharacters(this.currentPage + 1);
    }
  }

  searchCharacters(): void {
    // * We clear the subscription and the characters signal to perform a clean search
    this.getPaginatedCharactersSubscription?.unsubscribe();
    this.characters.set([]);

    // * If the search parameter is empty, we reload the list as it was at the start of the application
    if (this.searchQuery === '') {
      this.loadPaginatedCharacters();
      return;
    }

    this.loadingService.showSpinner();

    this.getCharactersByNameStartsWithSubscription = this.marvelService
      .getCharactersByNameStartsWith(this.searchQuery)
      .subscribe({
        next: (resp: CharacterApiResponse) => {
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

  handlerScrolling(id: number) {
    if (
      this.characters().length < this.totalCharacters &&
      this.characters().at(-2)?.id === id &&
      this.searchQuery === ''
    ) {
      this.nextPage();
    }
  }
}
