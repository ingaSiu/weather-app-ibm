import { currentYear } from '../../utils/currentYear';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer>
      <div className={styles.container}>
        <p>
          {' '}
          &#169; by Inga for IBM <span>{currentYear}</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
