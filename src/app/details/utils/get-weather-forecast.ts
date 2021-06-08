import {
  Observable,
  OperatorFunction,
  pipe,
} from 'rxjs';
import {
  concatMap,
  map,
  shareReplay,
} from 'rxjs/operators';

import { Coordinates } from '../../core/models';
import {
  YandexWeatherForecast,
  YandexWeatherResponse,
} from '../models/yandex-weather';
import { WeatherStorageService } from '../services/weather-storage.service';

export function getWeatherForecasts(cityCoordinates$: Observable<Coordinates>, weatherStorage: WeatherStorageService): Observable<YandexWeatherForecast[]> {
  return cityCoordinates$.pipe(
    concatMap((coordinates) => weatherStorage.getYandexWeatherForecast(coordinates?.latitude, coordinates?.longitude)),
    convertResponseToForecasts(),
  );
}

function convertResponseToForecasts(): OperatorFunction<YandexWeatherResponse, YandexWeatherForecast[]> {
  return pipe(
    map((response) => response.forecasts),
  );
}
