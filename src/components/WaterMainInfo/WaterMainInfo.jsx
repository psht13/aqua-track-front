import css from "./WaterMainInfo.module.css";

import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import WaterDailyNorma from "../waterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import Logo from "../Logo/Logo";

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
