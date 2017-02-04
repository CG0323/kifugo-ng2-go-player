// app
import { HomeRoutes } from './home/home.routes';
import { PlayerRoutes } from './player/player.routes';

export const routes: Array<any> = [
  {
    path: '',
    redirectTo: '/kifus',
    pathMatch: 'full'
  },
  ...HomeRoutes,
  ...PlayerRoutes
];
