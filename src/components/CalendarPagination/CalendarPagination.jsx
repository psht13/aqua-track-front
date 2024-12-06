import PropTypes from "prop-types";
import css from "./CalendarPagination.module.css";

import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

const CalendarPagination = ({ currentDate, setCurrentDate }) => {
  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  return (
    <div className={css.pagination}>
      <button
        onClick={handlePrevMonth}
        className={css.navButton}
        aria-label="Previous Month">
        {/* ← */}
        <MdOutlineKeyboardArrowLeft fontSize={"24px"} />
      </button>
      <h3 className={css.currentDate}>
        {currentDate instanceof Date && !isNaN(currentDate)
          ? `${currentDate.toLocaleString("en-US", {
              month: "long",
            })}, ${currentDate.getFullYear()}`
          : "Invalid Date"}
      </h3>
      <button
        onClick={handleNextMonth}
        className={css.navButton}
        aria-label="Next Month">
        {/* → */}
        <MdOutlineKeyboardArrowRight fontSize="24px" />
      </button>
    </div>
  );
};

CalendarPagination.propTypes = {
  currentDate: PropTypes.instanceOf(Date).isRequired,
  setCurrentDate: PropTypes.func.isRequired,
};

export default CalendarPagination;
