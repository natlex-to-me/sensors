import { Routes } from '@angular/router';

import { ChartsComponent } from './components/charts/charts.component';
import { DetailsComponent } from './components/details/details.component';
import { TableComponent } from './components/table/table.component';
import { DetailPaths } from './detail-paths';

export const routes: Routes = [
  {
    path: '',
    component: DetailsComponent,
    children: [
      {
        path: DetailPaths.charts,
        component: ChartsComponent,
      },
      {
        path: DetailPaths.table,
        component: TableComponent,
      },
    ],
  },
];
