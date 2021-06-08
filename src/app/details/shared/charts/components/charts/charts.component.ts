import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import {
  BehaviorSubject,
  combineLatest,
} from 'rxjs';
import {
  map,
  shareReplay,
  startWith,
  tap,
} from 'rxjs/operators';

import {
  AppRoutes,
  LoadingStatuses,
} from '../../../../../core/constants';
import {
  ResourceTypeColors,
  ResourceTypeNames,
  ResourceTypes,
  ResourceTypeToggles,
} from '../../../../../core/constants/resource-types';
import {
  resetTimeForDate,
  unixTimeToDate,
} from '../../../../../core/utils/date-helpers';
import { DetailPaths } from '../../../../detail-paths';
import { DataSetsForCharts } from '../../../../models/data-sets-for-charts';
import { YandexWeatherForecast } from '../../../../models/yandex-weather';
import { WeatherStorageService } from '../../../../services/weather-storage.service';
import {
  getWeatherForecasts,
  setCity,
  setCityCoordinates,
} from '../../../../utils';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent {
  firstDay = new Date();
  lastDay = new Date();
  loadingStatuses = LoadingStatuses;
  pickedDate = resetTimeForDate(new Date());

  readonly resourceTypes = Object.values(ResourceTypes);
  readonly resourceTypeNames = ResourceTypeNames;
  readonly resourceTypeToggles = ResourceTypeToggles;

  private readonly _cityId$ = setCity(this._route.params);

  readonly routeToTable$ = this._cityId$.pipe(
    map((cityId) => AppRoutes.getUrlFromRoute(AppRoutes.Details, DetailPaths.table, cityId))
  );

  private readonly _cityCoordinates$ = setCityCoordinates(this._cityId$);

  readonly _weatherForecasts$ = getWeatherForecasts(this._cityCoordinates$, this._weatherStorage).pipe(
    tap((forecasts) => this._setFirstAndLastDay(forecasts)),
    shareReplay(),
  );

  private readonly _doReload$ = new BehaviorSubject<void>(null);

  readonly _updatableWeatherForecasts$ = combineLatest(
    [
      this._weatherForecasts$,
      this._doReload$,
    ]
  ).pipe(
    map(([forecast]) => forecast),
  );

  private readonly _loadedChartDataSets$ = this._updatableWeatherForecasts$.pipe(
    map((forecasts) => this._convertForecastsToDataSets(forecasts)),
  );

  readonly chartDataSets$ = this._loadedChartDataSets$.pipe(
    map((chartData) => this._convertDataSetsToChart(chartData)),
  );

  readonly loadingStatus$ = this._loadedChartDataSets$.pipe(
    map((i) => {
      if (i.humidity.length > 0 || i.pressure.length > 0 || i.temperature.length > 0) {
        return LoadingStatuses.hasLoaded;
      }

      return LoadingStatuses.hasNoData;
    }),
    startWith(LoadingStatuses.isLoading),
  );

  readonly chartLabels$ = this._updatableWeatherForecasts$.pipe(
    map((forecasts) => this._convertForecastsToLabels(forecasts)),
  );

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _weatherStorage: WeatherStorageService,
  ) {
  }

  changeDate(date: Date) {
    this.pickedDate = date;

    this._doReload$.next();
  }

  disableDates = (date: Date | null): boolean => resetTimeForDate(date) >= this.firstDay
    && resetTimeForDate(date) <= this.lastDay;

  toggleResource(resource: ResourceTypes) {
    this.resourceTypeToggles[resource] = !this.resourceTypeToggles[resource];

    this._doReload$.next();
  }

  private _convertDataSetsToChart(chartData: DataSetsForCharts): ChartDataSets[] {
    const dataSet = <ChartDataSets[]>[];

    this.resourceTypes.forEach((res) => {
      if (this.resourceTypeToggles[res]) {
        dataSet.push(
          {
            backgroundColor: `${<string>ResourceTypeColors[res]}50`,
            borderColor: <string>ResourceTypeColors[res],
            data: chartData[res],
            label: <string>ResourceTypeNames[res],
            pointBackgroundColor: <string>ResourceTypeColors[res],
            pointBorderColor: <string>ResourceTypeColors[res],
          },
        );
      }
    });

    return dataSet;
  }

  private _convertForecastsToDataSets(forecasts: YandexWeatherForecast[]): DataSetsForCharts {
    return forecasts.reduce(
      (acc, x) => ({
        humidity: acc.humidity.concat(x.hours.filter((i) => this._filterChartByDate(i.hour_ts)).map((i) => i.humidity)),
        pressure: acc.pressure.concat(x.hours.filter((i) => this._filterChartByDate(i.hour_ts)).map((i) => i.pressure_mm)),
        temperature: acc.temperature.concat(x.hours.filter((i) => this._filterChartByDate(i.hour_ts)).map((i) => i.temp)),
      }),
      <DataSetsForCharts>{
        humidity: [],
        pressure: [],
        temperature: [],
      }
    );
  }

  private _convertForecastsToLabels(forecasts: YandexWeatherForecast[]): Label[] {
    return forecasts.reduce(
      (acc, x) => acc.concat(
        x.hours.filter((i) => this._filterChartByDate(i.hour_ts)).map((i) => `${unixTimeToDate(i.hour_ts).toUTCString()}`)
      ),
      <Label[]>[]
    );
  }

  private _filterChartByDate(date: number): boolean {
    return resetTimeForDate(unixTimeToDate(date)).getTime() == this.pickedDate.getTime();
  }

  private _setFirstAndLastDay(forecasts: YandexWeatherForecast[]) {
    const withHourForecasts = forecasts.filter((i) => i.hours.length != 0);

    this.firstDay = resetTimeForDate(new Date(withHourForecasts[0].date));
    this.lastDay = resetTimeForDate(new Date(withHourForecasts[withHourForecasts.length - 1].date));
  }
}
