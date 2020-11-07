import { YandexWeatherResponse } from '../../details/models/yandex-weather';

const currentYear = 2020;
const currentMonth = 11;
const currentDay = 7;

export const yandexWeatherMockResponse = <YandexWeatherResponse>{
  forecasts: [
    {
      date: new Date(currentYear, currentMonth, currentDay),
      hours: [
        {
          hour_ts: 1,
          humidity: 2,
          pressure_mm: 3,
          temp: 4,
        },
      ],
    },
  ],
};
