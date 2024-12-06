import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import css from "./WaterList.module.css";
import { selectDayWater, selectTodayWater } from "../../redux/water/selectors";
import { getDayWater } from "../../redux/water/operations";
import WaterItem from "../WaterItem/WaterItem";

// Функція для правильного форматування часу в AM/PM без змін часової зони
const formatTime = (timeString) => {
  const date = new Date(timeString); // Перетворюємо час у Date
  // Якщо це не валідна дата, повертаємо порожній рядок
  if (isNaN(date.getTime())) return "";

  // Форматування часу в AM/PM
  return date.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const WaterList = ({ day }) => {
  const dispatch = useDispatch();
  const dayWaterList = useSelector(selectDayWater);
  const todayWaterList = useSelector(selectTodayWater);

  const formattedDay = (day instanceof Date ? day : new Date(day))
    .toISOString()
    .split("T")[0];
  const today = (day instanceof Date ? day : new Date(day))
    .toISOString()
    .split("T")[0];

  useEffect(() => {
    dispatch(getDayWater(formattedDay));
  }, [formattedDay, dispatch, dayWaterList]);
  console.log("water list: dayWaterList", dayWaterList);

  const waterData = day === today ? todayWaterList || [] : dayWaterList || [];

  if (!waterData.length) {
    return (
      <p className={css.noRecords}>
        You haven’t drunk any water yet. Time to hydrate!
      </p>
    );
  }

  return (
    <div className={css.waterListContainer}>
      <ul className={css.waterList}>
        {waterData.map((item, i) => (
          <li key={item.id + " - " + i}>
            <WaterItem item={item} />
            {/* Форматуємо і відображаємо час для кожного елемента */}
            <p>{formatTime(item.time)}</p>
            {/* Припустимо, що `item.time` містить строку з часом, отриману з бекенду */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WaterList;
