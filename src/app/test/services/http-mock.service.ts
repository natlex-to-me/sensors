import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { YandexWeatherResponse } from '../../details/models/yandex-weather';
import { yandexWeatherMockResponse } from '../constants/yandex-weather-mock-response';

@Injectable({
  providedIn: 'root',
})
export class HttpMockService {
  get(): Observable<YandexWeatherResponse> {
    return of(yandexWeatherMockResponse);
  }
}
