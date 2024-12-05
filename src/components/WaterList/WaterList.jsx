import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import css from "./WaterList.module.css";
import { selectDayWater, selectTodayWater } from "../../redux/water/selectors";
import { getDayWater } from "../../redux/water/operations";
import WaterItem from "../WaterItem/WaterItem";

const WaterList = ({ filteredRecords }) => {
  console.log(filteredRecords);
  const dispatch = useDispatch();
  const dayWaterList = useSelector(selectDayWater) || [];
  const todayWaterList = useSelector(selectTodayWater);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (filteredRecords === today) {
      dispatch(getDayWater(today));
    } else {
      dispatch(getDayWater(filteredRecords));
    }
  }, [filteredRecords, dispatch, today]);

  const waterData = filteredRecords === today ? todayWaterList : dayWaterList;
  console.log(waterData);

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
          <li key={item._id}>
            <WaterItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WaterList;
