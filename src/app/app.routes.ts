import { Routes } from '@angular/router';

import { LoginComponent } from './auth/pages/login/login.component';
import { authGuard } from './auth/guards/auth.guard';
import { LayoutComponent } from './shared/layout/layout.component';
import { MarvelListComponent } from './pages/marvel-list/marvel-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'marvel-list',
        component: MarvelListComponent,
        canActivate: [authGuard],
      },
    ],
  },
];
