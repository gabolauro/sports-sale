import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'sport/1', pathMatch: 'full' },
    {
      path: 'sport/:id',
      loadComponent: () => import('./routes/products/products.page'),
    },
    {
      path: 'summary',
      loadComponent: () => import('./routes/summary/summary.page'),
    },
  ];
