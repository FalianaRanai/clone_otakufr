import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MEDIAS_ROUTES } from './routes/medias.routes';

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
      {
        path: 'page/:page',
        component: HomeComponent,
      },
      {
        path: 'medias',
        title: 'Media',
        children: MEDIAS_ROUTES,
      },
    ],
  },
  { path: '**', redirectTo: 'home' }, // Redirection si la route est inconnue
];
