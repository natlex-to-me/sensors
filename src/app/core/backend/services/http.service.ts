import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { YandexWeatherApiKeyHeader } from '../../constants/yandex-weather-api-key-header';
import { YandexWeatherConfig } from '../../models/yandex-weather-config';
import { YandexWeatherConfigService } from './yandex-weather-config.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    @Inject(YandexWeatherConfigService)
    private readonly _config: YandexWeatherConfig,
    private readonly _http: HttpClient,
  ) {
  }

  get<BodyType>(url: string, headers?: HttpHeaders): Observable<BodyType> {
    return this._get<BodyType>(url, headers).pipe(
      map((i) => i.body),
    );
  }

  private _configHeaders(headers: HttpHeaders): HttpHeaders {
    return (headers ?? new HttpHeaders())
      .append(YandexWeatherApiKeyHeader, this._config.yandexWeatherApiKey);
  }

  private _get<BodyType>(url: string, headers?: HttpHeaders): Observable<HttpResponse<BodyType>> {
    return this._http.get<BodyType>(
      url,
      {
        headers: this._configHeaders(headers),
        observe: 'response',
      }
    );
  }
}
