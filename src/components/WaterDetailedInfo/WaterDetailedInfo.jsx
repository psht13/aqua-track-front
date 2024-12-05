import { useState } from 'react';
import css from './WaterDetailedInfo.module.css';

import DailyInfo from '../DailyInfo/DailyInfo';
import MonthInfo from '../MonthInfo/MonthInfo';
import UserPanel from '../UserPanel/UserPanel';

const WaterDetailedInfo = ({ waterRecords }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [setOpenSetting] = useState(false);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  return (
    <div className={css.card}>
      <UserPanel setOpenSetting={setOpenSetting} />
      <DailyInfo selectedDate={selectedDate} />
      <MonthInfo waterRecords={waterRecords} onDateChange={handleDateChange} />
    </div>
  );
};

export default WaterDetailedInfo;
