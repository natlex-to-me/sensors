import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  concatMap,
  map,
  shareReplay,
} from 'rxjs/operators';

import {
  AppRouteParams,
  CityCoordinates,
} from '../../../../../core/constants';
import { AppRoutes } from '../../../../../core/constants/app-routes';
import {
  ResourceTypeNames,
  ResourceTypes,
} from '../../../../../core/constants/resource-types';
import { Coordinates } from '../../../../../core/models';
import { unixTimeToDate } from '../../../../../core/utils/date-helpers';
import { DataSetsForTable } from '../../../../models/data-sets-for-table';
import {
  YandexWeatherForecast,
  YandexWeatherHourForecast,
} from '../../../../models/yandex-weather';
import { WeatherStorageService } from '../../../../services/weather-storage.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  readonly resourceTypes = Object.values(ResourceTypes);
  readonly resourceTypeNames = ResourceTypeNames;

  private readonly _cityId$ = this._route.params.pipe(
    map((params) => String(params[AppRouteParams.CityId])),
  );

  readonly routeToCharts$ = this._cityId$.pipe(
    map((cityId) => AppRoutes.getUrlFromRoute(AppRoutes.Details, cityId))
  );

  private readonly _cityCoordinates$ = this._cityId$.pipe(
    map((cityId) => <Coordinates>CityCoordinates[cityId]),
  );

  private readonly _weatherForecasts$ = this._cityCoordinates$.pipe(
    concatMap((coordinates) => this._weatherStorage.getYandexWeatherForecast(coordinates.latitude, coordinates.longitude)),
    map((response) => response.forecasts),
    shareReplay(),
  );

  readonly tableDataSets$ = this._weatherForecasts$.pipe(
    map((forecasts) => this._convertForecastsToHourForecasts(forecasts)),
    map((hourForecasts) => this._convertHourForecastsToTable(hourForecasts)),
  );

  readonly displayedColumns$ = this.tableDataSets$.pipe(
    map(
      (i) => i.length
        ? Object.keys(i[0])
        : []
    ),
  );

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _weatherStorage: WeatherStorageService,
  ) {
  }

  private _convertForecastsToHourForecasts(forecasts: YandexWeatherForecast[]): YandexWeatherHourForecast[] {
    return forecasts.reduce(
      (acc, x) => acc.concat(x.hours),
      <YandexWeatherHourForecast[]>[]
    );
  }

  private _convertHourForecastsToTable(forecasts: YandexWeatherHourForecast[]): DataSetsForTable[] {
    return forecasts.map((hourForecast) => <DataSetsForTable>{
      date: unixTimeToDate(hourForecast.hour_ts).toUTCString(),
      humidity: hourForecast.humidity,
      pressure: hourForecast.pressure_mm,
      temperature: hourForecast.temp,
    });
  }
}
