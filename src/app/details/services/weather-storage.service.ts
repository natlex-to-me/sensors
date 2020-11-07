import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from '../../core/backend/services/http.service';
import { CityCoordinatesConfig } from '../models/city-coordinates-config';
import { YandexWeatherResponse } from '../models/yandex-weather';
import { CityCoordinatesConfigService } from './city-coordinates-config.service';

const apiVersion = 'v2';

@Injectable({
  providedIn: 'root',
})
export class WeatherStorageService {
  constructor(
    @Inject(CityCoordinatesConfigService)
    private readonly _config: CityCoordinatesConfig,
    private readonly _http: HttpService,
  ) {
  }

  getYandexWeatherForecast(latitude = this._config.latitude, longitude = this._config.longitude): Observable<YandexWeatherResponse> {
    const routeToGetWeatherForecast = `/api/${apiVersion}/forecast?`
      + `lat=${latitude}`
      + `&lon=${longitude}`
      + `&limit=7`
      + `&hours=true`;

    return this._http.get<YandexWeatherResponse>(routeToGetWeatherForecast);
  }
}
