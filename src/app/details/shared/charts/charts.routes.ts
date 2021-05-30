import { Routes } from '@angular/router';

import { AppRoutes } from '../../../core/constants';
import { ChartsComponent } from './components';

export const routes: Routes = [
  {
    path: AppRoutes.DetailsCityId,
    component: ChartsComponent,
  },
];
