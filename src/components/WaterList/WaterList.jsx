import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import css from "./WaterList.module.css";
import { selectDayWater, selectTodayWater } from "../../redux/water/selectors";
import { getDayWater } from "../../redux/water/operations";
import WaterItem from "../WaterItem/WaterItem";

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
  }, [formattedDay, dispatch]);

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
        {waterData.map((item) => (
          <li key={item.id}>
            <WaterItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WaterList;
