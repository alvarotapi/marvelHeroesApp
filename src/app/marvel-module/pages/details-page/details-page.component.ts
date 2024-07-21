import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { Character } from '../../interfaces/character-comic.interface';
import { LoadingService } from '../../../shared/services/loading.service';
import { MarvelService } from '../../services/marvel.service';
import { CharacterApiResponse } from '../../interfaces/marvel-api.interface';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { BuildImagePipe } from '../../../shared/pipes/build-image.pipe';
import { ComicUrltoLocalPipe } from '../../../shared/pipes/comic-url-to-local.pipe';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    LoadingComponent,
    BuildImagePipe,
    ComicUrltoLocalPipe,
  ],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsPageComponent {
  character?: Character;
  characterId!: string;

  private paramMapSubscription?: Subscription;
  private getCharacterByIdSubscription?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private marvelService: MarvelService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.paramMapSubscription = this.activatedRoute.paramMap.subscribe(
      (params) => {
        this.characterId = params.get('id')!;
        if (this.characterId) {
          this.loadCharacterDetails(this.characterId);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.paramMapSubscription?.unsubscribe();
    this.getCharacterByIdSubscription?.unsubscribe();
  }

  loadCharacterDetails(id: string) {
    this.loadingService.showSpinner();

    this.getCharacterByIdSubscription = this.marvelService
      .getCharacterById(id)
      .subscribe({
        next: (resp: CharacterApiResponse) => {
          this.character = resp.data.results[0];

          this.loadingService.hideSpinner();
        },
        error: (error) => {
          this.loadingService.hideSpinner();
          throw new Error('Error fetching characters:', error);
        },
      });
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }
}
