import { Routes } from '@angular/router';
import { Categories } from './feature/categories/categories';
import { Games } from './feature/games/games';
import { Home } from './feature/home/home';
import { TournamentUi } from './feature/tournament-ui/tournament-ui';
import { Weeks } from './feature/weeks/weeks';

export const routes: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  {
    path: 'app',
    component: Home,
    children: [
      { path: '', redirectTo: 'tournament', pathMatch: 'full' },
      { path: 'tournament', component: TournamentUi },
      { path: 'weeks', component: Weeks },
      { path: 'category', component: Categories },
      { path: 'game', component: Games },
    ],
  },
];
