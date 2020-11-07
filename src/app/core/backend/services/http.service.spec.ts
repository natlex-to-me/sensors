import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { testUrl } from '../../../test/constants/test-url';
import { yandexWeatherApiTestKey } from '../../../test/constants/yandex-weather-api-test-key';
import { YandexWeatherApiKeyHeader } from '../../constants/yandex-weather-api-key-header';
import { YandexWeatherConfig } from '../../models/yandex-weather-config';
import { HttpService } from './http.service';
import { YandexWeatherConfigService } from './yandex-weather-config.service';

let service: HttpService = null;
let httpMock: HttpTestingController = null;

describe('HttpService', () => {
  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          HttpClientTestingModule,
        ],
        providers: [
          {
            provide: YandexWeatherConfigService,
            useValue: <YandexWeatherConfig>{
              yandexWeatherApiKey: yandexWeatherApiTestKey,
            },
          },
        ],
      });
    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  tests();
});

function tests() {
  let expectedResponse = [];

  beforeEach(() => {
    service = TestBed.inject(HttpService);
    expectedResponse = [
      {
        number: 1,
        string: 'A',
      },
      {
        number: 2,
        string: 'B',
      },
    ];
  });

  it('should create', () => {
    expect(service).not.toBeNull();
  });

  it('should return expected response (called once)', () => {
    service.get(testUrl).subscribe(
      (response) => {
        expect(response).toEqual(expectedResponse);
      },
      fail
    );

    const request = httpMock.expectOne(testUrl);

    expect(request.request.method).toEqual('GET');

    request.flush(expectedResponse);
  });

  it('should return expected response (called multiple times)', () => {
    const count = 5;

    Array.from(Array(count)).forEach(() => {
      service.get(testUrl).subscribe();
    });

    service.get(testUrl).subscribe(
      (response) => {
        expect(response).toEqual(expectedResponse);
      },
      fail
    );

    const requests = httpMock.match(testUrl);

    expect(requests.length).toEqual(count + 1);

    Array.from(Array(count)).forEach((_, i) => requests[i].flush([
      {
        number: i,
        string: `test-string${i}`,
      },
    ]));

    requests[count].flush(expectedResponse);
  });

  it('should have Yandex Weather Api Key Header', () => {
    service.get(testUrl).subscribe();

    const request = httpMock.expectOne(testUrl);

    expect(request.request.headers.has(YandexWeatherApiKeyHeader)).toBeTruthy();

    expect(request.request.headers.get(YandexWeatherApiKeyHeader)).toEqual(yandexWeatherApiTestKey);

    request.flush(expectedResponse);
  });
}
