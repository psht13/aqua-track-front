import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWaterByDay, deleteWaterRecord } from "../../redux/waterSlice"; // Предполагается, что эти действия определены
import css from "./WaterList.module.css";
import sprite from "../../assets/sprite.svg";
import DeleteWaterModal from "../DeleteWaterModal/DeleteWaterModal";

const WaterList = ({ selectedDate }) => {
  const [activeModal, setActiveModal] = useState(null); // Состояние для модального окна
  const [selectedWaterId, setSelectedWaterId] = useState(null); // ID выбранного элемента
  const dispatch = useDispatch();

  // Данные из Redux
  const { waterData, isLoading, error } = useSelector((state) => state.water);

  // Формат времени для отображения
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const isPM = hours >= 12;
    const formattedHours = hours % 12 || 12;
    const period = isPM ? "PM" : "AM";
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  // Обновляем данные при изменении выбранной даты
  useEffect(() => {
    if (selectedDate) {
      console.log("Selected date changed to:", selectedDate);
      const dayString = selectedDate.toISOString().split("T")[0];
      console.log("Fetching water data for selected date:", dayString);
      dispatch(fetchWaterByDay(dayString)); // Запрашиваем данные с сервера
    }
  }, [selectedDate, dispatch]);

  // Открытие модального окна
  const handleOpenModal = (modalType, waterId) => {
    setActiveModal(modalType);
    setSelectedWaterId(waterId);
  };

  // Закрытие модального окна
  const handleCloseModal = () => {
    setActiveModal(null);
    setSelectedWaterId(null);
  };

  // Удаление записи о воде
  const handleDelete = () => {
    if (selectedWaterId) {
      dispatch(deleteWaterRecord(selectedWaterId)).then(() => {
        setActiveModal(null);
        setSelectedWaterId(null);
      });
    }
  };

  return (
    <div className={css.container}>
      {isLoading && <p>Loading water data...</p>}
      {error && <p className={css.error}>Error: {error}</p>}
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
                <span className={css.volume}>{item.amount} ml</span>
                <span className={css.time}>{formatTime(item.date)}</span>
              </div>
              <div className={css.actions}>
                <button
                  className={css.actionButton}
                  onClick={() => handleOpenModal("edit", item.id)}
                >
                  <svg>
                    <use href={`${sprite}#icon-edit-2`} />
                  </svg>
                </button>
                <button
                  className={css.actionButton}
                  onClick={() => handleOpenModal("delete", item.id)}
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

      {/* Модальное окно для удаления */}
      {activeModal === "delete" && (
        <DeleteWaterModal
          waterId={selectedWaterId}
          onClose={handleCloseModal}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default WaterList;
