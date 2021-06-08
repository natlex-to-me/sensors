import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  map,
  shareReplay,
} from 'rxjs/operators';

import { AppRoutes } from '../../../../../core/constants/app-routes';
import {
  ResourceTypeNames,
  ResourceTypes,
} from '../../../../../core/constants/resource-types';
import { unixTimeToDate } from '../../../../../core/utils/date-helpers';
import { DataSetsForTable } from '../../../../models/data-sets-for-table';
import {
  YandexWeatherForecast,
  YandexWeatherHourForecast,
} from '../../../../models/yandex-weather';
import { WeatherStorageService } from '../../../../services/weather-storage.service';
import {
  getWeatherForecasts,
  setCity,
  setCityCoordinates,
} from '../../../../utils';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  readonly resourceTypes = Object.values(ResourceTypes);
  readonly resourceTypeNames = ResourceTypeNames;

  private readonly _cityId$ = setCity(this._route.params);

  readonly routeToCharts$ = this._cityId$.pipe(
    map((cityId) => AppRoutes.getUrlFromRoute(AppRoutes.Details, cityId))
  );

  private readonly _cityCoordinates$ = setCityCoordinates(this._cityId$);

  private readonly _weatherForecasts$ = getWeatherForecasts(this._cityCoordinates$, this._weatherStorage).pipe(
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
