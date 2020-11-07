export interface YandexWeatherResponse {
  forecasts: YandexWeatherForecast[];
}

export interface YandexWeatherForecast {
  date: Date;
  hours: YandexWeatherHourForecast[];
}

export interface YandexWeatherHourForecast {
  hour_ts: number;
  humidity: number;
  pressure_mm: number;
  temp: number;
}
