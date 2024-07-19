import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-marvel-list',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>marvel-list works!</p>`,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarvelListComponent { }
