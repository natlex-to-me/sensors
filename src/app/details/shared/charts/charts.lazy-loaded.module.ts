import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MenuSharedModule } from '../../../shared/menu/menu.shared.module';
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
    MenuSharedModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
})
export class ChartsLazyLoadedModule {
}
