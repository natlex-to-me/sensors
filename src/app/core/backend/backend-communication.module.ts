import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { YandexWeatherConfig } from '../models/yandex-weather-config';
import { throwIfAlreadyLoaded } from '../utils/module-import-guard';
import { YandexWeatherConfigService } from './services/yandex-weather-config.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
})
export class BackendCommunicationModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: BackendCommunicationModule,
  ) {
    throwIfAlreadyLoaded(parentModule, 'BackendCommunicationModule');
  }

  static forRoot(
    config: YandexWeatherConfig,
  ): ModuleWithProviders<BackendCommunicationModule> {
    return {
      ngModule: BackendCommunicationModule,
      providers: [
        {
          provide: YandexWeatherConfigService,
          useValue: config,
        },
      ],
    };
  }
}
