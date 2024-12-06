import css from "./CalendarItem.module.css";

const CalendarItem = ({
  day,
  currentDate = new Date(),
  progress,
  onDaySelect,
  selectedDate,
}) => {
  const today = new Date();

  // Перетворення дати з часу на локальний
  const adjustDateForLocalTime = (dateString) => {
    const date = new Date(dateString);
    // Приведення до місцевого часу, щоб уникнути зміщення на день
    date.setHours(date.getHours() - date.getTimezoneOffset() / 60);
    return date;
  };

  const isToday =
    today.getFullYear() === currentDate.getFullYear() &&
    today.getMonth() === currentDate.getMonth() &&
    today.getDate() === day;

  const isSelected =
    selectedDate &&
    selectedDate.getFullYear() === currentDate.getFullYear() &&
    selectedDate.getMonth() === currentDate.getMonth() &&
    selectedDate.getDate() === day &&
    !isToday;

  const handleDayClick = () => {
    const selectedDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    // Перетворюємо дату на локальний формат перед передачею
    onDaySelect(adjustDateForLocalTime(selectedDay).toISOString());
  };

  return (
    <button
      className={`${css.day} ${isToday ? css.today : ""}`}
      onClick={handleDayClick}
      aria-label={`Select day ${day}`}
    >
      <div className={`${css.dayCircle} ${isSelected ? css.selected : ""}`}>
        {day}
      </div>
      <small className={css.progress}>{progress}%</small>
    </button>
  );
};

export default CalendarItem;
