import { useState } from "react";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import WaterList from "../WaterList/WaterList";
import css from "./DailyInfo.module.css";
import UserSettingsModal from "../UserSettingsModal/UserSettingsModal";

const DailyInfo = ({
  userName = "Nadia",
  waterRecords = [],
  selectedDate = new Date(),
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleUpdate = () => {
    console.log("User settings updated");
    closeModal(); // Закриваємо модалку після оновлення
  };

  const filteredRecords = waterRecords.filter((record) => {
    const recordDate = new Date(record.date);
    return recordDate.toDateString() === selectedDate.toDateString();
  });

  const formattedDate =
    selectedDate.toDateString() === new Date().toDateString()
      ? "Today"
      : `${selectedDate.getDate()}, ${selectedDate.toLocaleString("en-US", {
          month: "long",
        })}`;

  return (
    <div className={css.container}>
      <header className={css.header}>
        <h1 className={css.greeting}>
          Hello, <span className={css.username}>{userName}</span>!
        </h1>
        <div className={css.userMenu}>
          <button
            onClick={() => setMenuVisible(!menuVisible)}
            className={css.menuButton}
          >
            <span className={css.userName}>{userName}</span>
            <div className={css.avatar}></div>
            <svg className={css.icon}>
              <use
                href={`src/assets/sprite.svg#icon-chevron-${
                  menuVisible ? "up" : "down"
                }`}
              />
            </svg>
          </button>
          {menuVisible && (
            <div className={css.menu}>
              <button onClick={openModal} className={css.menuItem}>
                <svg className={css.icon}>
                  <use href="src/assets/sprite.svg#icon-settings" />
                </svg>
                Setting
              </button>

              {/* Модальне вікно */}
              {isModalOpen && (
                <UserSettingsModal
                  onClose={closeModal}
                  onUpdate={handleUpdate}
                />
              )}
              <button
                onClick={() => console.log("Log out")}
                className={css.menuItem}
              >
                <svg className={css.icon}>
                  <use href="src/assets/sprite.svg#icon-log-out" />
                </svg>
                Log out
              </button>
            </div>
          )}
        </div>
      </header>

      <div className={css.dateAndAction}>
        <h2 className={css.date}>{formattedDate}</h2>
        <AddWaterBtn
          className={css.customAddWaterBtn}
          onClick={() => console.log("Add water")}
        />
      </div>

      <WaterList records={filteredRecords} />
      {/* {filteredRecords.length > 0 ? (
      ) : (
        <p className={css.noRecords}>No records for this day.</p>
      )} */}
    </div>
  );
};

export default DailyInfo;
