import { getFormattedDate } from '../../utils/getDate';
import styles from './Card.module.scss';

type Props = {
  city: string;
  //imgTitle: string;
  temperature: number;
  feelsLike: number;
  wind: number;
  gusts: number;
  humidity: number;
  precipitation: number;
};

const Card = ({ city, temperature, feelsLike, wind, gusts, humidity, precipitation }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.column}>
        <div className={styles.cityWrapper}>
          <h1>{city}</h1>
          <p>{getFormattedDate()}</p>
        </div>

        <div className={styles.imgWrapper}>
          <img src="./rain.png" alt="weather prediction picture" />
          <p>{temperature}°C</p>
        </div>
      </div>

      <div>
        <h4>Next Hour:</h4>

        <div className={styles.predictionsWrapper}>
          <div className={styles.predictionsBlock}>
            <p>Feels Like: {feelsLike} °C </p>
            <p>
              Wind Speed (Gusts): {wind} ({gusts}) m/s
            </p>
          </div>
          <div className={styles.predictionsBlock}>
            <p>Relative Humidity: {humidity} % </p>
            <p>Precipitation: {precipitation} mm</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
