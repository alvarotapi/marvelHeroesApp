import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { BuildImagePipe } from '../../../shared/pipes/build-image.pipe';
import { Character } from '../../../features/marvel/interfaces/character-comic.interface';

@Component({
  selector: 'app-list-card',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, BuildImagePipe],
  templateUrl: './list-card.component.html',
  styleUrl: './list-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  public character = input.required<Character>();
  public characterId = output<number>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.characterId.emit(this.character().id);
  }

  moreDetails() {
    this.router.navigateByUrl(`/details/${this.character().id}`);
  }
}
