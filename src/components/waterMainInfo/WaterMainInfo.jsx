import css from "./WaterMainInfo.module.css";

import AddWaterBtn from "../addWaterBtn/AddWaterBtn";
import WaterDailyNorma from "../waterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "../waterProgressBar/WaterProgressBar";

const WaterMainInfo = () => {
  return (
    <div className={css.card}>
      <h2 className={css.logo}>AquaTrack</h2>
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtn />
    </div>
  );
};

export default WaterMainInfo;
