import { DailyForecast, Forecast } from '../types/forecast';
import { getDayOfWeek, getShortDate } from '../utils/getDate';
import { useEffect, useState } from 'react';

import Card from '../components/card/Card';
import CitySearch from '../components/search/CitySearch';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Loader from '../components/loader/Loader';
import SmallCard from '../components/smallCard/SmallCard';
import { getWeatherForecast } from '../api/weatherForecast';
import { mapToDays } from '../utils/getDailyForecast';
import styles from './Home.module.scss';
import { useVisitedCities } from '../hooks/useVisitedCities';

const Home = () => {
  const [weather, setWeather] = useState<Forecast | null>(null);
  const [dailyForecast, setDailyForecast] = useState<DailyForecast[]>([]);
  const { visitedCities, addCity } = useVisitedCities();

  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const defaultCity = 'vilnius';

  useEffect(() => {
    const fetchWeather = async () => {
      console.log(defaultCity);
      const data = await getWeatherForecast(selectedCity ? selectedCity : defaultCity);
      setWeather(data);

      if (data && data.forecastTimestamps) {
        const dailyData = mapToDays(data.forecastTimestamps);
        setDailyForecast(dailyData);
        console.log(dailyData);
      }

      if (selectedCity) {
        const cityName = data?.place.name || selectedCity;
        addCity(selectedCity, cityName);
      }
    };

    fetchWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity]);

  return (
    <>
      <Header />

      <section className={styles.container}>
        <div className={styles.searchWrapper}>
          <CitySearch onCitySelect={setSelectedCity} />
          <div className={styles.visitedCities}>
            {visitedCities.slice(0, 3).map((city) => (
              <a
                key={city.code}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCity(city.code);
                }}
              >
                {city.name}
              </a>
            ))}
          </div>
        </div>

        {weather && weather.forecastTimestamps.length > 0 ? (
          <Card
            city={weather.place.name}
            temperature={Math.round(weather.forecastTimestamps[0]?.airTemperature)}
            feelsLike={Math.round(weather.forecastTimestamps[0]?.feelsLikeTemperature)}
            wind={weather.forecastTimestamps[0]?.windSpeed}
            gusts={weather.forecastTimestamps[0]?.windGust}
            humidity={weather.forecastTimestamps[0]?.relativeHumidity}
            precipitation={weather.forecastTimestamps[0]?.totalPrecipitation}
            conditionCode={weather.forecastTimestamps[0]?.conditionCode}
          />
        ) : (
          <p>{selectedCity ? <Loader /> : 'Select a city to get started.'}</p>
        )}
      </section>

      <section className={styles.weeklyInfo}>
        <h1>Upcoming forecast:</h1>
        <div className={styles.smallCardsWrapper}>
          {dailyForecast.length > 0 ? (
            dailyForecast
              .slice(1)
              .map((day, index) => (
                <SmallCard
                  key={index}
                  day={getDayOfWeek(day.date)}
                  date={getShortDate(day.date)}
                  temperatureDay={Math.round(day.day.maxTemperature ?? '-')}
                  temperatureNight={Math.round(day.night.minTemperature ?? '-')}
                  dayConditionCode={day.day.conditionCode}
                  nightConditionCode={day.night.conditionCode}
                />
              ))
          ) : (
            <p>{selectedCity ? <Loader /> : 'Select a city to get started.'}</p>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
