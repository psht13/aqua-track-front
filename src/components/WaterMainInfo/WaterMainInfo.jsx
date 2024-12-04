import styles from "./WaterMainInfo.module.css";

import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma'
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import Logo from "../Logo/Logo";

const WaterMainInfo = () => {
  return (
		<section className={styles.mainInfo}>
			<Logo />
			<div className={styles.infoBlock}>
				<WaterDailyNorma />
				<WaterProgressBar />
				<AddWaterBtn />
			</div>
		</section>
	);
};

export default WaterMainInfo;
