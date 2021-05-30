import { Routes } from '@angular/router';

import { AppRoutes } from '../../../core/constants';
import { TableComponent } from './components';

export const routes: Routes = [
  {
    path: AppRoutes.DetailsCityId,
    component: TableComponent,
  },
];
