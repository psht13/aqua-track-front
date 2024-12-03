import PropTypes from 'prop-types';
import styles from './WaterProgressBar.module.css';

const WaterProgressBar = ({ progress, date }) => {
  const displayDate = date === 'Today' ? 'Today' : date;

  // Определение ближайшей отметки, которая меньше или равна текущему прогрессу
  const getClosestMarker = (progress) => {
    const markers = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    for (let i = markers.length - 1; i >= 0; i--) {
      if (progress >= markers[i]) return markers[i];
    }
    return 0;
  };

  const closestMarker = getClosestMarker(progress);

  // Генерация динамических отметок
  const renderDynamicMarkers = () => {
    const dynamicMarkers = [10, 20, 30, 40, 60, 70, 80, 90];
    return dynamicMarkers.map((mark) => (
      <span
        key={mark}
        className={`${styles.marker} ${closestMarker === mark ? styles.visible : ''}`}
        style={{ left: `${mark}%` }}
      >
        {mark}%
      </span>
    ));
  };

  return (
    <div className={styles.progressContainer} aria-label={`Progress: ${progress}%`}>
      {/* Дата */}
      <span className={styles.label}>{displayDate}</span>

      {/* Прогресс-бар */}
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
        {/* Кружок текущего прогресса */}
        <div className={styles.progressCircle} style={{ left: `${progress}%` }}></div>
      </div>

      {/* Отметки */}
      <div className={styles.markers}>
        {/* Статичные отметки */}
        <span className={styles.staticMarker} style={{ left: '0%' }}>0%</span>
        <span className={styles.staticMarker} style={{ left: '50%' }}>50%</span>
        <span className={styles.staticMarker} style={{ left: '100%' }}>100%</span>
        
        {/* Динамические отметки */}
        {renderDynamicMarkers()}
      </div>
    </div>
  );
};

WaterProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
};

export default WaterProgressBar;
