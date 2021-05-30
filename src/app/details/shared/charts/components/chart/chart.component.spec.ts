import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { ChartType } from 'chart.js';

import { environment } from '../../../../../../environments/environment';
import { YandexWeatherConfigService } from '../../../../../core/backend/services/yandex-weather-config.service';
import { ChartTypeToggleOrder } from '../../../../../core/constants/chart-type-toggle-order';
import { SharedModule } from '../../../../../shared/shared.module';
import { CityCoordinatesConfigService } from '../../../../services/city-coordinates-config.service';
import { ChartComponent } from './chart.component';

let component: ChartComponent = null;
let fixture: ComponentFixture<ChartComponent> = null;

describe('ChartComponent', () => {
  beforeEach(async () => {
    await TestBed
      .configureTestingModule({
        imports: [
          HttpClientTestingModule,
          SharedModule,
        ],
        declarations: [
          ChartComponent,
        ],
        providers: [
          {
            provide: CityCoordinatesConfigService,
            useValue: environment.defaultCityCoordinates,
          },
          {
            provide: YandexWeatherConfigService,
            useValue: environment.yandexWeatherApiKey,
          },
        ],
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
  });

  tests();
});

function tests() {
  beforeEach(() => {
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).not.toBeNull();
  });

  it('should render canvas', () => {
    const compiled = <HTMLElement>fixture.debugElement.nativeElement;

    expect(compiled.querySelector('canvas').textContent).not.toBeNull();
  });

  it('should toggle chart types', () => {
    const count = 5;

    Array.from(Array(count)).forEach(() => {
      const { nextChartTypeIndex }: ChartComponent = component;
      const nextChartType = <ChartType>ChartTypeToggleOrder[nextChartTypeIndex];

      component.toggleChartsType(nextChartTypeIndex);

      const { currentChartType }: ChartComponent = component;

      expect(currentChartType).toEqual(nextChartType);
    });
  });
}
