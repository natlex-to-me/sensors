import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../shared/shared.module';
import { routes } from './charts.routes';
import {
  ChartComponent,
  ChartsComponent,
} from './components';

@NgModule({
  declarations: [
    ChartComponent,
    ChartsComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ],
})
export class ChartsLazyLoadedModule {
}
