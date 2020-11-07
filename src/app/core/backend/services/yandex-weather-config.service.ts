import { InjectionToken } from '@angular/core';

import { YandexWeatherConfig } from '../../models/yandex-weather-config';

export const YandexWeatherConfigService = new InjectionToken<YandexWeatherConfig>('YandexWeatherConfig');
