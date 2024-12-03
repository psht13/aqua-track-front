import { useState } from 'react';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import WaterList from '../WaterList/WaterList';
import css from './DailyInfo.module.css';
import sprite from '../../assets/sprite.svg';

const DailyInfo = ({
  userName = 'Nadia',
  waterRecords = [],
  selectedDate = new Date(),
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // Отслеживание текущего модального окна

  const filteredRecords = waterRecords.filter((record) => {
    const recordDate = new Date(record.date);
    return recordDate.toDateString() === selectedDate.toDateString();
  });

  const formattedDate =
    selectedDate.toDateString() === new Date().toDateString()
      ? 'Today'
      : `${selectedDate.getDate()}, ${selectedDate.toLocaleString('en-US', {
          month: 'long',
        })}`;

  const handleOpenModal = (modalType) => {
    setActiveModal(modalType); // Устанавливаем тип модального окна
  };

  const handleCloseModal = () => {
    setActiveModal(null); // Закрываем модальное окно
  };

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
                  menuVisible ? 'up' : 'down'
                }`}
              />
            </svg>
          </button>
          {menuVisible && (
            <div className={css.menu}>
              <button
                onClick={() => handleOpenModal('settings')}
                className={css.menuItem}
              >
                <svg className={css.icon}>
                  <use href={`${sprite}#icon-settings`} />
                </svg>
                Setting
              </button>
              <button
                onClick={() => handleOpenModal('logout')}
                className={css.menuItem}
              >
                <svg className={css.icon}>
                  <use href={`${sprite}#icon-log-out`} />
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
          onClick={() => console.log('Add water')}
        />
      </div>

      <WaterList records={filteredRecords} />

      {/* Модальные окна */}
      {activeModal === 'settings' && (
        <div className={css.modal}>
          <h2>Settings Modal</h2>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )}
      {activeModal === 'logout' && (
        <div className={css.modal}>
          <h2>Logout Modal</h2>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default DailyInfo;
