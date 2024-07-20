import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ToolbarModule } from 'primeng/toolbar';

import { AuthService } from '../../../auth/services/auth.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-tool-bar',
  standalone: true,
  imports: [CommonModule, ToolbarModule, ToolbarModule, ButtonModule],
  template: `
    <p-toolbar>
      <div class="p-toolbar-group-end">
        <p-button
          label="Logout"
          class="mr-2"
          (click)="this.authService.logout()"
        />
      </div>
    </p-toolbar>
  `,
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
