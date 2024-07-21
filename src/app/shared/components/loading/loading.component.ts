import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ProgressBarModule } from 'primeng/progressbar';

import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, ProgressBarModule],
  template: `
    @if (loadingService.loading$ | async) {
    <p-progressBar mode="indeterminate" [style]="{ height: '25px' }" />
    }
  `,
  styles: `
    p-progressBar {
     height: 6px;
     margin: 10px 10px 10px 10px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {
  constructor(public loadingService: LoadingService) {}
}
