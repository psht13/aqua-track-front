import PropTypes from 'prop-types';
import styles from './WaterDailyNorma.module.css';

const WaterDailyNorma = ({ norma }) => {
  return (
    <div className={styles.dailyNorma}>
      <p className={styles.normaValue}>{norma} L</p>
      <span className={styles.normaLabel}>My daily norma</span>
    </div>
  );
};

WaterDailyNorma.propTypes = {
  norma: PropTypes.number.isRequired,
};

export default WaterDailyNorma;
