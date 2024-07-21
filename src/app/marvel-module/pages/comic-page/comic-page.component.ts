import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { LoadingService } from '../../../shared/services/loading.service';
import { MarvelService } from '../../services/marvel.service';
import { ComicApiResponse } from '../../interfaces/marvel-api.interface';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { BuildImagePipe } from '../../../shared/pipes/build-image.pipe';
import { Comic } from '../../interfaces/character-comic.interface';

@Component({
  selector: 'app-comic-page',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    LoadingComponent,
    BuildImagePipe,
  ],
  templateUrl: './comic-page.component.html',
  styleUrl: './comic-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicPageComponent {
  comic?: Comic;
  comicId!: string;
  characterId!: string;

  private paramMapSubscription?: Subscription;
  private getComicByIdSubscription?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private marvelService: MarvelService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.paramMapSubscription = this.activatedRoute.paramMap.subscribe(
      (params) => {
        this.characterId = params.get('characterId')!;
        this.comicId = params.get('comicId')!;

        if (this.comicId) {
          this.loadComic(this.comicId);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.paramMapSubscription?.unsubscribe();
    this.getComicByIdSubscription?.unsubscribe();
  }

  loadComic(id: string) {
    this.loadingService.showSpinner();

    this.getComicByIdSubscription = this.marvelService
      .getComicById(id)
      .subscribe({
        next: (resp: ComicApiResponse) => {
          this.comic = resp.data.results[0];
          this.loadingService.hideSpinner();
        },
        error: (error) => {
          this.loadingService.hideSpinner();
          throw new Error('Error fetching characters:', error);
        },
      });
  }

  navigateToCharacter(id: number | string) {
    this.router.navigate(['/details', id]);
  }
}
