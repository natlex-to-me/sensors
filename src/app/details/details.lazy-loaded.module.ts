import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { DetailsComponent } from './components/details/details.component';
import { TableComponent } from './components/table/table.component';
import { routes } from './details.routes';

@NgModule({
  declarations: [
    DetailsComponent,
    TableComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ],
})
export class DetailsLazyLoadedModule {
}
