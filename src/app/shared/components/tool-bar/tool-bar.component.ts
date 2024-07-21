import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

import { AuthService } from '../../../features/auth/services/auth.service';

@Component({
  selector: 'app-tool-bar',
  standalone: true,
  imports: [CommonModule, ToolbarModule, ToolbarModule, ButtonModule],
  templateUrl: './tool-bar.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolBarComponent {
  constructor(public authService: AuthService) {}
}
