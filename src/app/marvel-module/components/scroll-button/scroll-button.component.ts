import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-scroll-button',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `<p-button
    type="button"
    (click)="scrollToBottom()"
    icon="pi pi-arrow-down"
    class="p-button-rounded p-button-primary"
  /> `,
  styles: `

p-button {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollButtonComponent {
  scrollToBottom(): void {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }
}
