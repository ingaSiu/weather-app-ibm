export type Forecast = {
  place: {
    code: string;
    name: string;
  };
  forecastTimestamps: {
    airTemperature: number;
    cloudCover: number;
    conditionCode: string;
    feelsLikeTemperature: number;
    forecastTimeUtc: string;
    relativeHumidity: number;
    seaLevelPressure: number;
    totalPrecipitation: number;
    windDirection: number;
    windGust: number;
    windSpeed: number;
  }[];
};

export type ForecastTimestamps = {
  airTemperature: number;
  cloudCover: number;
  conditionCode: string;
  feelsLikeTemperature: number;
  forecastTimeUtc: string;
  relativeHumidity: number;
  seaLevelPressure: number;
  totalPrecipitation: number;
  windDirection: number;
  windGust: number;
  windSpeed: number;
}[];

export type DailyForecast = {
  date: string;
  day: {
    maxTemperature: number;
    conditionCode: string;
  };
  night: {
    minTemperature: number;
    conditionCode: string;
  };
};

export type HourlyForecast = {
  forecastTimeUtc: string;
  airTemperature: number;
  conditionCode: string;
};
