import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

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

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  readonly resourceTypes = Object.values(ResourceTypes);
  readonly resourceTypeNames = ResourceTypeNames;
  readonly routeToCharts = AppRoutes.getUrlFromRoute(AppRoutes.Details);

  private readonly _weatherForecasts$ = new BehaviorSubject(<YandexWeatherForecast[]>[]);

  readonly tableDataSets$ = this._weatherForecasts$.pipe(
    map((forecasts) => forecasts.reduce(
      (acc, x) => acc.concat(x.hours),
      <YandexWeatherHourForecast[]>[]
    )),
    map((hourForecasts) => hourForecasts.map((hourForecast) => <DataSetsForTable>{
      date: unixTimeToDate(hourForecast.hour_ts).toUTCString(),
      humidity: hourForecast.humidity,
      pressure: hourForecast.pressure_mm,
      temperature: hourForecast.temp,
    })),
  );

  readonly displayedColumns$ = this.tableDataSets$.pipe(
    map(
      (i) => i.length
        ? Object.keys(i[0])
        : []
    ),
  );

  constructor(
    private readonly _weatherStorage: WeatherStorageService,
  ) {
  }

  ngOnInit() {
    this._weatherStorage.getYandexWeatherForecast().pipe(
      map((response) => response.forecasts),
    ).subscribe(this._weatherForecasts$);
  }
}
