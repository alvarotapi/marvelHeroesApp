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

import { Character } from '../../interfaces/character.interface';
import { CharacterImagePipe } from '../../../shared/pipes/character-image.pipe';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, CharacterImagePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
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
