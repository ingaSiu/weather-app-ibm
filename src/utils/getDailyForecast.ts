import { DailyForecast, ForecastTimestamps } from '../types/forecast';

export const mapToDays = (forecasts: ForecastTimestamps): DailyForecast[] => {
  const dayForecasts: DailyForecast[] = [];
  const dayStartHour = 6;
  const nightStartHour = 18;
  let maxTemp: number | null = null;
  let minTemp: number | null = null;
  let nigthtimeConditions: string[] = [];
  let daytimeConditions: string[] = [];
  let currentDayForecastDate = new Date(forecasts[0].forecastTimeUtc + 'Z').toISOString().split('T')[0];
  forecasts.forEach((hourlyForecast) => {
    const dateTime = new Date(hourlyForecast.forecastTimeUtc + 'Z');
    const hour = dateTime.getUTCHours();
    const isNighttime = hour < dayStartHour || hour >= nightStartHour;
    const currentHourlyForecastDate = dateTime.toISOString().split('T')[0];

    if (!isNighttime && (maxTemp === null || hourlyForecast.airTemperature > maxTemp)) {
      maxTemp = hourlyForecast.airTemperature;
    }

    if (isNighttime && (minTemp === null || hourlyForecast.airTemperature < minTemp)) {
      minTemp = hourlyForecast.airTemperature;
    }

    if (!isNighttime) {
      daytimeConditions.push(hourlyForecast.conditionCode);
    } else {
      nigthtimeConditions.push(hourlyForecast.conditionCode);
    }

    if (!isNighttime && new Date(currentHourlyForecastDate) > new Date(currentDayForecastDate)) {
      const dayConditionCode = daytimeConditions.reduce((prev, curr) =>
        daytimeConditions.filter((el) => el === curr).length > daytimeConditions.filter((el) => el === prev).length
          ? curr
          : prev,
      );
      const nightConditionCode = nigthtimeConditions.reduce((prev, curr) =>
        nigthtimeConditions.filter((el) => el === curr).length > nigthtimeConditions.filter((el) => el === prev).length
          ? curr
          : prev,
      );

      dayForecasts.push({
        date: currentDayForecastDate,
        day: {
          maxTemperature: maxTemp === null ? 0 : maxTemp,
          conditionCode: dayConditionCode,
        },
        night: {
          minTemperature: minTemp === null ? 0 : minTemp,
          conditionCode: nightConditionCode,
        },
      });

      currentDayForecastDate = currentHourlyForecastDate;
      maxTemp = null;
      minTemp = null;
      daytimeConditions = [];
      nigthtimeConditions = [];
    }
  });
  return dayForecasts;
};
