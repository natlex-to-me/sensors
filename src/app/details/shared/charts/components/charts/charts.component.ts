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
  concatMap,
  map,
  shareReplay,
  tap,
} from 'rxjs/operators';

import {
  AppRouteParams,
  AppRoutes,
  CityCoordinates,
} from '../../../../../core/constants';
import {
  ResourceTypeColors,
  ResourceTypeNames,
  ResourceTypes,
  ResourceTypeToggles,
} from '../../../../../core/constants/resource-types';
import { Coordinates } from '../../../../../core/models';
import {
  resetTimeForDate,
  unixTimeToDate,
} from '../../../../../core/utils/date-helpers';
import { DetailPaths } from '../../../../detail-paths';
import { DataSetsForCharts } from '../../../../models/data-sets-for-charts';
import { YandexWeatherForecast } from '../../../../models/yandex-weather';
import { WeatherStorageService } from '../../../../services/weather-storage.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent {
  firstDay = new Date();
  lastDay = new Date();
  pickedDate = resetTimeForDate(new Date());

  readonly resourceTypes = Object.values(ResourceTypes);
  readonly resourceTypeNames = ResourceTypeNames;
  readonly resourceTypeToggles = ResourceTypeToggles;

  private readonly _cityId$ = this._route.params.pipe(
    map((params) => String(params[AppRouteParams.CityId])),
  );

  readonly routeToTable$ = this._cityId$.pipe(
    map((cityId) => AppRoutes.getUrlFromRoute(AppRoutes.Details, DetailPaths.table, cityId))
  );

  private readonly _cityCoordinates$ = this._cityId$.pipe(
    map((cityId) => <Coordinates>CityCoordinates[cityId]),
  );

  readonly _weatherForecasts$ = this._cityCoordinates$.pipe(
    concatMap((coordinates) => this._weatherStorage.getYandexWeatherForecast(coordinates.latitude, coordinates.longitude)),
    map((response) => response.forecasts),
    tap((forecasts) => {
      const withHourForecasts = forecasts.filter((i) => i.hours.length != 0);

      this.firstDay = resetTimeForDate(new Date(withHourForecasts[0].date));
      this.lastDay = resetTimeForDate(new Date(withHourForecasts[withHourForecasts.length - 1].date));
    }),
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

  readonly chartDataSets$ = this._updatableWeatherForecasts$.pipe(
    map((forecasts) => this._convertForecastsToDataSets(forecasts)),
    map((chartData) => this._convertDataSetsToChart(chartData)),
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
}
