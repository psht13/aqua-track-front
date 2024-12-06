import { useMemo } from "react";
import CalendarItem from "../CalendarItem/CalendarItem";
import css from "./Calendar.module.css";

const getDaysInMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};

const Calendar = ({
  currentMonth,
  onDaySelect,
  waterRecords = [],
  selectedDate,
}) => {
  const dailyProgress = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const days = getDaysInMonth(currentMonth);

    const progress = {};
    days.forEach((day) => {
      const recordsForDay = waterRecords.filter(
        (record) =>
          new Date(record.date).getFullYear() === year &&
          new Date(record.date).getMonth() === month &&
          new Date(record.date).getDate() === day
      );

      const totalVolume = recordsForDay.reduce(
        (sum, record) => sum + record.volume,
        0
      );
      const dailyNorm = 2000;

      progress[day] = Math.min((totalVolume / dailyNorm) * 100, 100);
    });

    return progress;
  }, [currentMonth, waterRecords]);

  return (
    <div className={css.container}>
      <div className={css.grid}>
        {getDaysInMonth(currentMonth).map((day) => (
          <CalendarItem
            key={day}
            day={day}
            currentDate={currentMonth}
            progress={dailyProgress[day] || 0}
            onDaySelect={onDaySelect}
            selectedDate={selectedDate}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
