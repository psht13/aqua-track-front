import { useSelector } from "react-redux";
import css from "./WaterDailyNorma.module.css";

const WaterDailyNorma = () => {
  const DailyNorma = 1.5;
  // const dailyNorma = useSelector()

  return (
    <div className={css.card}>
      <p className={css.amount}>{DailyNorma}</p>
      <p className={css.descr}>My daily norma</p>
    </div>
  );
};

export default WaterDailyNorma;
