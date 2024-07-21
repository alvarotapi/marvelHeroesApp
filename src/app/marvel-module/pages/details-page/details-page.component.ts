import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Character } from '../../interfaces/character.interface';
import { LoadingService } from '../../../shared/services/loading.service';
import { MarvelService } from '../../services/marvel.service';
import { MarvelApiResponse } from '../../interfaces/marvel-api.interface';

import { CardModule } from 'primeng/card';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { Subscription } from 'rxjs';
import { CharacterImagePipe } from '../../../shared/pipes/character-image.pipe';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [CommonModule, CardModule, LoadingComponent, CharacterImagePipe],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsPageComponent {
  character: Character | undefined = undefined;
  characterId: string | null = null;

  private paramMapSubscription?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private marvelService: MarvelService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.paramMapSubscription = this.activatedRoute.paramMap.subscribe(
      (params) => {
        this.characterId = params.get('id');
        if (this.characterId) {
          this.loadCharacterDetails(this.characterId);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.paramMapSubscription?.unsubscribe();
  }

  loadCharacterDetails(id: string) {
    this.loadingService.showSpinner();

    this.marvelService.getCharacterById(id).subscribe({
      next: (resp: MarvelApiResponse) => {
        this.character = resp.data.results[0];

        this.loadingService.hideSpinner();
      },
      error: (error) => {
        this.loadingService.hideSpinner();
        throw new Error('Error fetching characters:', error);
      },
    });
  }
}
