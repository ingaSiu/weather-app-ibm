import styles from './SmallCard.module.scss';

type Props = {
  day: string;
  date: string;
  temperatureDay: number;
  temperatureNight: number;
};

const SmallCard = ({ day, date, temperatureDay, temperatureNight }: Props) => {
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
        <img src="./rain.png" alt="rain" />
      </div>
    </div>
  );
};

export default SmallCard;
