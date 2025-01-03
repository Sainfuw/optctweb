import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/about/about-page.component'),
  },
  {
    path: 'deck-builder',
    loadComponent: () =>
      import('./pages/deck-builder/deck-builder-page.component'),
  },
  {
    path: 'cards',
    loadComponent: () => import('./pages/cards/cards-page.component'),
  },
  {
    path: 'card/:id',
    loadComponent: () => import('./pages/card/card-page.component'),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact-page.component'),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
]
