import { InjectionToken } from '@angular/core';

import { CityCoordinatesConfig } from '../models/city-coordinates-config';

export const CityCoordinatesConfigService = new InjectionToken<CityCoordinatesConfig>('CityCoordinatesConfig');
