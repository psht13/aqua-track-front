import { useState } from "react";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import WaterList from "../WaterList/WaterList";
import css from "./DailyInfo.module.css";

const DailyInfo = ({ selectedDate = new Date() }) => {
  const [activeModal, setActiveModal] = useState(null);


  const formattedDate =
    selectedDate.toDateString() === new Date().toDateString()
      ? "Today"
      : `${selectedDate.getDate()}, ${selectedDate.toLocaleString("en-US", {
          month: "long",
        })}`;

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <div className={css.container}>
      <div className={css.dateAndAction}>
        <h3 className={css.date}>{formattedDate}</h3>
        <AddWaterBtn
          className={css.customAddWaterBtn}
          onClick={() => console.log("Add water")}
        />
      </div>

      <WaterList day={selectedDate} />

      {activeModal === "settings" && (
        <div className={css.modal}>
          <h2>Settings Modal</h2>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )}
      {activeModal === "logout" && (
        <div className={css.modal}>
          <h2>Logout Modal</h2>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default DailyInfo;
