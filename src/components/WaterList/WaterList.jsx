import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWaterByDay,
  deleteWaterRecord,
} from "../../redux/user/waterSlice";
import css from "./WaterList.module.css";
import sprite from "../../assets/sprite.svg";
import DeleteWaterModal from "../DeleteWaterModal/DeleteWaterModal";

const WaterList = ({ selectedDate }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedWaterId, setSelectedWaterId] = useState(null);
  const dispatch = useDispatch();

  const { waterData, isLoading, error } = useSelector((state) => state.water);

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const isPM = hours >= 12;
    const formattedHours = hours % 12 || 12; // Convert 0 or 12 to 12-hour format
    const period = isPM ? "PM" : "AM";
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  useEffect(() => {
    if (selectedDate) {
      const dayString = selectedDate.toISOString().split("T")[0];
      dispatch(fetchWaterByDay(dayString));
    }
  }, [selectedDate, dispatch]);

  const handleOpenModal = (modalType, waterId) => {
    setActiveModal(modalType);
    setSelectedWaterId(waterId);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setSelectedWaterId(null);
  };

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
                <span className={css.volume}>{item.volume} ml</span>
                <span className={css.time}>{formatTime(item.time)}</span>
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
