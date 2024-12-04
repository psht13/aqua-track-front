import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import styles from "./TrackerPage.module.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../redux/user/operations";
const TrackerPage = () => {
  const dispatch = useDispatch();

  const f = async () => {
    try {
      const user = await dispatch(getUser());
      console.log(user);
    } catch (error) {}
  };

  useEffect(() => {
    f();
  }, []);

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
