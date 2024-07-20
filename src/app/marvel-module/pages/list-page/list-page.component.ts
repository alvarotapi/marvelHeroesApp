import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { MarvelService } from '../../services/marvel.service';
import { CardComponent } from '../../components/card/card.component';
import { Character } from '../../interfaces/character.interface';
import { MarvelApiResponse } from '../../interfaces/marvel-api.interface';
import { LoadingService } from '../../../shared/services/loading.service';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

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
  ],
  templateUrl: './list-page.component.html',
  styles: `
    :host {
      display: block;
    }

    p-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPageComponent {
  protected readonly characters = signal<Character[]>([]);
  private totalCharacters: number = 0;
  private currentPage: number = 0;
  private pageSize: number = 10;

  public searchQuery: string = '';

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

  // TODO: Refactorizar esto
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

  scrollToBottom(): void {
    // TODO: Aclarar los comentarios
    // * Hacemos scroll porque la carga va condicionada al defer (on viewport)
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });

    // * Se vuelve a llamar aquí, porque como las peticiones a la API de Marvel son bastante lentas, así se hace la experiencia de usuario más fluida y va cargando un "buffer" con registros.
    this.nextPage();
  }

  searchCharacters(): void {
    this.clearCharacters();

    if (this.searchQuery === '') {
      this.loadCharacters();
      return;
    }

    try {
      this.loadingService.showSpinner();
      this.getPaginatedCharactersSubscription = this.marvelService
        .getCharactersByNameStartsWith(this.searchQuery)
        .subscribe({
          next: (resp: MarvelApiResponse) => {
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
    } catch (error) {
      console.error(error);
    }
  }

  clearCharacters() {
    this.getPaginatedCharactersSubscription?.unsubscribe();
    this.characters.set([]);
  }
}
