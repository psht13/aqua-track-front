import css from './CalendarItem.module.css';

const CalendarItem = ({
  day,
  currentDate = new Date(),
  progress,
  onDaySelect,
  selectedDate,
}) => {
  const today = new Date();
  const isToday =
    today.getFullYear() === currentDate.getFullYear() &&
    today.getMonth() === currentDate.getMonth() &&
    today.getDate() === day;

  const isSelected =
    selectedDate &&
    selectedDate.getFullYear() === currentDate.getFullYear() &&
    selectedDate.getMonth() === currentDate.getMonth() &&
    selectedDate.getDate() === day;

  const handleDayClick = () => {
    const selectedDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    onDaySelect(selectedDay);
  };

  return (
    <button
      className={`${css.day} ${isToday ? css.today : ''} ${
        isSelected ? css.selected : ''
      }`}
      onClick={handleDayClick}
      aria-label={`Select day ${day}`}
    >
      <div className={css.dayCircle}>{day}</div>
      <small className={css.progress}>{progress}%</small>
    </button>
  );
};

export default CalendarItem;
