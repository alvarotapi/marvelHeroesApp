import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule],
  template: `
    <div *ngIf="loadingService.loading$ | async" class="loading-overlay">
      <p-progressSpinner></p-progressSpinner>
    </div>
  `,
  styleUrl: './loading.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {
  constructor(public loadingService: LoadingService) {}
}
