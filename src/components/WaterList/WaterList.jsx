import { useState } from 'react';
import css from './WaterList.module.css';
import sprite from '../../assets/sprite.svg';
import DeleteWaterModal from '../DeleteWaterModal/DeleteWaterModal';

const WaterList = () => {
  const [activeModal, setActiveModal] = useState(null); // Состояние для отслеживания открытого модального окна
  const [selectedWaterId, setSelectedWaterId] = useState(null); // ID выбранного элемента

  const waterData = [
    { id: 1, volume: 250, time: '07:00', date: new Date(2024, 12, 29) },
    { id: 2, volume: 500, time: '12:00', date: new Date(2024, 12, 29) },
    { id: 3, volume: 300, time: '16:00', date: new Date(2024, 12, 29) },
    { id: 4, volume: 250, time: '18:50', date: new Date(2024, 12, 29) },
    { id: 5, volume: 500, time: '19:00', date: new Date(2024, 12, 29) },
    { id: 6, volume: 300, time: '22:10', date: new Date(2024, 12, 30) },
  ];

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const isPM = hours >= 12;
    const formattedHours = hours % 12 || 12;
    const period = isPM ? 'PM' : 'AM';
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const handleOpenModal = (modalType, waterId) => {
    setActiveModal(modalType); // Устанавливаем тип модального окна
    setSelectedWaterId(waterId); // Устанавливаем ID воды
  };

  const handleCloseModal = () => {
    setActiveModal(null); // Закрываем модальное окно
    setSelectedWaterId(null); // Сбрасываем выбранный ID
  };

  return (
    <div className={css.container}>
      {waterData.length > 0 ? (
        <div className={css.list}>
          {waterData.map((item) => (
            <div key={item.id} className={css.item}>
              <div className={css.icon}>
                <svg>
                  <use href={`${sprite}#icon-glass`} />
                </svg>
              </div>
              <div className={css.details}>
                <span className={css.volume}>{item.volume} ml</span>
                <span className={css.time}>{formatTime(item.time)}</span>
              </div>
              <div className={css.actions}>
                <button
                  className={css.actionButton}
                  onClick={() => handleOpenModal('edit', item.id)}
                >
                  <svg>
                    <use href={`${sprite}#icon-edit-2`} />
                  </svg>
                </button>
                <button
                  className={css.actionButton}
                  onClick={() => handleOpenModal('delete', item.id)}
                >
                  <svg>
                    <use href={`${sprite}#icon-trash-04`} />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className={css.noRecords}>
          You haven’t drunk any water yet. Time to hydrate!
        </p>
      )}

      {/* Модальные окна */}
      {activeModal === 'delete' && (
        <DeleteWaterModal
          waterId={selectedWaterId}
          onClose={handleCloseModal}
        />
      )}
      {/* Здесь можно будет добавить другие модальные окна */}
    </div>
  );
};

export default WaterList;
