import { TestBed } from '@angular/core/testing';

import { HttpService } from '../../core/backend/services/http.service';
import { yandexWeatherMockResponse } from '../../test/constants/yandex-weather-mock-response';
import { HttpMockService } from '../../test/services/http-mock.service';
import { CityCoordinatesConfig } from '../models/city-coordinates-config';
import { CityCoordinatesConfigService } from './city-coordinates-config.service';
import { WeatherStorageService } from './weather-storage.service';

let service: WeatherStorageService = null;

describe('WeatherStorageService', () => {
  beforeEach(() => {
    TestBed
      .configureTestingModule({
        providers: [
          {
            provide: CityCoordinatesConfigService,
            useValue: <CityCoordinatesConfig>{
              longitude: 1.1,
              latitude: 2.2,
            },
          },
          {
            provide: HttpService,
            useClass: HttpMockService,
          },
        ],
      });
    service = TestBed.inject(WeatherStorageService);
  });

  tests();
});

function tests() {
  const expectedResponse = yandexWeatherMockResponse;

  beforeEach(() => {
    service = TestBed.inject(WeatherStorageService);
  });

  it('should create', () => {
    expect(service).not.toBeNull();
  });

  it('should return expected response', () => {
    service.getYandexWeatherForecast().subscribe(
      (response) => {
        expect(response).toEqual(expectedResponse);
      },
      fail
    );
  });
}
