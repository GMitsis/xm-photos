import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/photo-list/photo-list.component').then(
        (c) => c.PhotoListComponent,
      ),
  },
  {
    path: 'photo/:id',
    loadComponent: () =>
      import('./components/photo-details/photo-details.component').then(
        (c) => c.PhotoDetailsComponent,
      ),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./components/favorites/favorites.component').then(
        (c) => c.FavoritesComponent,
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found/not-found.component').then(
        (c) => c.NotFoundComponent,
      ),
  }
];
