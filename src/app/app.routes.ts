import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './shared/pages/layout/layout.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { ListPageComponent } from './features/marvel/pages/list-page/list-page.component';
import { DetailsPageComponent } from './features/marvel/pages/details-page/details-page.component';
import { ComicPageComponent } from './features/marvel/pages/comic-page/comic-page.component';

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
        component: ListPageComponent,
        canActivate: [authGuard],
      },
      {
        path: 'details/:id',
        component: DetailsPageComponent,
        canActivate: [authGuard],
      },
      {
        path: 'comic/:comicId/character/:characterId',
        component: ComicPageComponent,
        canActivate: [authGuard],
      },
    ],
  },
];
