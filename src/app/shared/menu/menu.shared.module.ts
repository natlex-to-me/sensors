import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { exportComponents } from './constants';

@NgModule({
  declarations: [
    exportComponents,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    exportComponents,
  ],
})
export class MenuSharedModule {
}
