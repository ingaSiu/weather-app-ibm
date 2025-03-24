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
