import { useSelector } from "react-redux";
import { selectDailyNorm } from "../../redux/user/selectors";
import css from "./WaterDailyNorma.module.css";

const WaterDailyNorma = () => {
  const dailyNorma = useSelector(selectDailyNorm) || 1500;

  return (
    <div className={css.card}>
      <p className={css.amount}>{dailyNorma / 1000} L</p>
      <p className={css.descr}>My daily norma</p>
    </div>
  );
};

export default WaterDailyNorma;
