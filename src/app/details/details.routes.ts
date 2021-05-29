import { Routes } from '@angular/router';

import { DetailsComponent } from './components/details/details.component';
import { DetailPaths } from './detail-paths';

export const routes: Routes = [
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
