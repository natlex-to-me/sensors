import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../shared/shared.module';
import { TableComponent } from './components';
import { routes } from './table.routes';

@NgModule({
  declarations: [
    TableComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ],
})
export class TableLazyLoadedModule {
}
