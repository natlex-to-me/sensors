import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MenuSharedModule } from '../../../shared/menu/menu.shared.module';
import { SharedModule } from '../../../shared/shared.module';
import { TableComponent } from './components';
import { routes } from './table.routes';

@NgModule({
  declarations: [
    TableComponent,
  ],
  imports: [
    MenuSharedModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
})
export class TableLazyLoadedModule {
}
