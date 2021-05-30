import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MenuSharedModule } from '../shared/menu/menu.shared.module';
import { SharedModule } from '../shared/shared.module';
import { DetailsComponent } from './components/details/details.component';
import { routes } from './details.routes';

@NgModule({
  declarations: [
    DetailsComponent,
  ],
  imports: [
    MenuSharedModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
})
export class DetailsLazyLoadedModule {
}
