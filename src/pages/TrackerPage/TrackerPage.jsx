import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import styles from "./TrackerPage.module.css";
const TrackerPage = () => {
  return (
		<main className={styles.main}>
			<WaterMainInfo />
			<WaterDetailedInfo />
		</main>
	);
};

export default TrackerPage;

// const TrackerPage = () => {
//   return (
//     <div className={styles.container}>
//       <WaterMainInfo />
//       <WaterDetailedInfo />
//     </div>
//   );
// };

// export default TrackerPage;
