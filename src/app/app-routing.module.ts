import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutes, HOME_ROUTE } from './core/constants/app-routes';

export const routes: Routes = [
  {
    path: AppRoutes.Landing,
    pathMatch: 'full',
    loadChildren: () => import('./landing/landing.lazy-loaded.module').then((m) => m.LandingLazyLoadedModule),
  },
  {
    path: AppRoutes.Details,
    loadChildren: () => import('./details/details.lazy-loaded.module').then((m) => m.DetailsLazyLoadedModule),
  },
  {
    path: '**',
    redirectTo: HOME_ROUTE,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        onSameUrlNavigation: 'reload',
        scrollPositionRestoration: 'enabled',
      },
    ),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {
}
