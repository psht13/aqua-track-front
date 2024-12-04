import { useState } from 'react';
import css from './WaterDetailedInfo.module.css';

import DailyInfo from '../DailyInfo/DailyInfo';
import MonthInfo from '../MonthInfo/MonthInfo';

const WaterDetailedInfo = ({ waterRecords }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    console.log('Selected date updated to:', newDate);
  };

  return (
    <div className={css.card}>
      <DailyInfo waterRecords={waterRecords} selectedDate={selectedDate} />
      <MonthInfo waterRecords={waterRecords} onDateChange={handleDateChange} />
    </div>
  );
};

export default WaterDetailedInfo;
