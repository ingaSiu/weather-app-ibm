import { getImageSrc } from '../../utils/getImageSrc';
import styles from './SmallCard.module.scss';

type Props = {
  day: string;
  date: string;
  temperatureDay: number;
  temperatureNight: number;
  dayConditionCode: string;
  nightConditionCode: string;
};

const SmallCard = ({ day, date, temperatureDay, temperatureNight, dayConditionCode, nightConditionCode }: Props) => {
  const currentHour = new Date().getHours();
  const imageSrc = getImageSrc(
    currentHour >= 6 && currentHour < 18 ? dayConditionCode : nightConditionCode,
    currentHour,
  );

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.infoWrapper}>
        <h4>{day}</h4>
        <p>{date}</p>
        <div className={styles.infoTextWrapper}>
          <div className={styles.infoText}>
            <img src="./sun.png" alt="sun icon representing day" />
            <span>{temperatureDay} °C</span>
          </div>
          <div className={styles.infoText}>
            <img src="./moon.png" alt="moon icon representing night" />
            <span>{temperatureNight} °C</span>
          </div>
        </div>
      </div>
      <div className={styles.imgWrapper}>
        <img src={imageSrc} alt="weather prediction picture" />
      </div>
    </div>
  );
};

export default SmallCard;
