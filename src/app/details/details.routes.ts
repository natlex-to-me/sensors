import { Routes } from '@angular/router';

import {
  AppRoutes,
  HOME_ROUTE,
} from '../core/constants';
import { DetailsComponent } from './components/details/details.component';
import { DetailPaths } from './detail-paths';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppRoutes.getUrlFromRoute(HOME_ROUTE),
  },
  {
    path: '',
    component: DetailsComponent,
    children: [
      {
        path: DetailPaths.charts,
        loadChildren: () => import('./shared/charts').then((m) => m.ChartsLazyLoadedModule),
      },
      {
        path: DetailPaths.table,
        loadChildren: () => import('./shared/table').then((m) => m.TableLazyLoadedModule),
      },
    ],
  },
];
