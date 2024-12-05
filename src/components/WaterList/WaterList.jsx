import css from "./WaterList.module.css";
import { useSelector } from "react-redux";
import { selectDayWater } from "../../redux/water/selectors";

const WaterList = () => {
  // const waterData = [
  //   { id: 1, volume: 250, time: "07:00", date: new Date(2024, 12, 29) },
  //   { id: 2, volume: 500, time: "12:00", date: new Date(2024, 12, 29) },
  //   { id: 3, volume: 300, time: "16:00", date: new Date(2024, 12, 29) },
  //   { id: 4, volume: 250, time: "18:50", date: new Date(2024, 12, 29) },
  //   { id: 5, volume: 500, time: "19:00", date: new Date(2024, 12, 29) },
  //   { id: 6, volume: 300, time: "22:10", date: new Date(2024, 12, 30) },
  // ];
  const waterData = useSelector(selectDayWater);

  return (
    <div className={css.container}>
      {waterData.length > 0 ? (
        <ul className={css.list}>
          {waterData.map((item) => (
            <li key={item._id} className={css.item}></li>
          ))}
        </ul>
      ) : (
        <p className={css.noRecords}>
          You haven’t drunk any water yet. Time to hydrate!
        </p>
      )}
    </div>
  );
};

export default WaterList;
