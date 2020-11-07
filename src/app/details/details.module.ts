import { ModuleWithProviders, NgModule } from '@angular/core';

import { CityCoordinatesConfig } from './models/city-coordinates-config';
import { CityCoordinatesConfigService } from './services/city-coordinates-config.service';

@NgModule()
export class DetailsModule {
  static forRoot(
    config: CityCoordinatesConfig,
  ): ModuleWithProviders<DetailsModule> {
    return {
      ngModule: DetailsModule,
      providers: [
        {
          provide: CityCoordinatesConfigService,
          useValue: config,
        },
      ],
    };
  }
}
