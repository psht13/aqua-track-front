import css from "./WaterMainInfo.module.css";

import AddWaterBtn from "../addWaterBtn/AddWaterBtn";
import WaterDailyNorma from "../waterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "../waterProgressBar/WaterProgressBar";
import Logo from "../logo/Logo";

const WaterMainInfo = () => {
  return (
    <div className={css.card}>
      <Logo />
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtn />
    </div>
  );
};

export default WaterMainInfo;
