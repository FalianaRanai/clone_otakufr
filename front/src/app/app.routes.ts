import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        title: 'Accueil',
        component: HomeComponent,
      },
      {
        path: 'home',
        title: 'Accueil',
        component: HomeComponent,
      },
      { path: '**', redirectTo: 'home' }, // Redirection si la route est inconnue
    ],
  },
];
