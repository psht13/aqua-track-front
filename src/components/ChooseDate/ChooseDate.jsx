import { useState } from 'react';
import styles from './ChooseDate.module.css';

const ChooseDate = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

  const handleChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className={styles.container}>
      <label htmlFor="date-picker">Choose Date:</label>
      <input
        id="date-picker"
        type="date"
        value={selectedDate}
        onChange={handleChange}
        className={styles.input}
      />
    </div>
  );
};

export default ChooseDate;
