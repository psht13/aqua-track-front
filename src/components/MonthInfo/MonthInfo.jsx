import { useState } from 'react';
import CalendarPagination from '../CalendarPagination/CalendarPagination';
import Calendar from '../Calendar/Calendar';
import css from './MonthInfo.module.css';

const MonthInfo = ({ waterRecords, onDateChange }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Переконатися, що selectedDate є об'єктом типу Date
  const handleMonthChange = (newMonth) => {
    setCurrentMonth(newMonth);
  };

  const handleDaySelect = (date) => {
    // Перевірка на валідність дати перед оновленням
    const validDate = date instanceof Date && !isNaN(date) ? date : new Date(date);
    setSelectedDate(validDate);
    if (onDateChange) {
      onDateChange(validDate);
    }
  };

  const handleTodayClick = () => {
    const today = new Date();
    setSelectedDate(today);
    setCurrentMonth(today);
    if (onDateChange) {
      onDateChange(today);
    }
  };

  // Перевірка на те, чи є selectedDate коректною датою
  const isToday = selectedDate instanceof Date && !isNaN(selectedDate) && selectedDate.toDateString() === new Date().toDateString();

  return (
    <div className={css.container}>
      <header className={css.header}>
        <h2 className={css.title}>Month</h2>
        {!isToday && (
          <button className={css.todayButton} onClick={handleTodayClick}>
            Today
          </button>
        )}
        <div className={css.controls}>
          <CalendarPagination
            currentDate={currentMonth}
            onMonthChange={handleMonthChange}
            setCurrentDate={setCurrentMonth}
          />
        </div>
      </header>
      <Calendar
        currentMonth={currentMonth}
        waterRecords={waterRecords}
        onDaySelect={handleDaySelect}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default MonthInfo;
