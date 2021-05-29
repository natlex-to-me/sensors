import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import {
  BehaviorSubject,
  combineLatest,
  Subject,
} from 'rxjs';
import { map, tap } from 'rxjs/operators';

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

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit, OnDestroy {
  firstDay = new Date();
  lastDay = new Date();
  pickedDate = resetTimeForDate(new Date());
  routeToTable = [DetailPaths.table];

  readonly resourceTypes = Object.values(ResourceTypes);
  readonly resourceTypeNames = ResourceTypeNames;
  readonly resourceTypeToggles = ResourceTypeToggles;
  readonly _updatableWeatherForecasts$ = new BehaviorSubject(<YandexWeatherForecast[]>[]);
  readonly _weatherForecasts$ = new BehaviorSubject(<YandexWeatherForecast[]>[]);

  readonly chartLabels$ = this._updatableWeatherForecasts$.pipe(
    map((forecasts) => forecasts.reduce(
      (acc, x) => acc.concat(
        x.hours.filter((i) => this._filterChartByDate(i.hour_ts)).map((i) => `${unixTimeToDate(i.hour_ts).toUTCString()}`)
      ),
      <Label[]>[]
    )),
  );

  readonly chartDataSets$ = this._updatableWeatherForecasts$.pipe(
    map((forecasts) => forecasts.reduce(
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
    )),
    map((chartData) => {
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
    }),
  );

  private readonly _alive$ = new Subject();
  private readonly _doReload$ = new BehaviorSubject<void>(null);

  constructor(
    private readonly _weatherStorage: WeatherStorageService,
  ) {
  }

  ngOnInit() {
    this._weatherStorage.getYandexWeatherForecast().pipe(
      map((response) => response.forecasts),
      tap((forecasts) => {
        const withHourForecasts = forecasts.filter((i) => i.hours.length != 0);

        this.firstDay = resetTimeForDate(new Date(withHourForecasts[0].date));
        this.lastDay = resetTimeForDate(new Date(withHourForecasts[withHourForecasts.length - 1].date));
      }),
    ).subscribe(this._weatherForecasts$);

    combineLatest(
      [
        this._weatherForecasts$,
        this._doReload$,
      ]
    ).pipe(
      tap(([forecast]) => this._updatableWeatherForecasts$.next(forecast)),
    ).subscribe();
  }

  ngOnDestroy() {
    this._alive$.next();
    this._alive$.complete();
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

  private _filterChartByDate(date: number): boolean {
    return resetTimeForDate(unixTimeToDate(date)).getTime() == this.pickedDate.getTime();
  }
}
