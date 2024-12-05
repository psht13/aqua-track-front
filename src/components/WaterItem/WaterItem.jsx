import { useState } from "react";
import WaterModal from "../../components/WaterModal/WaterModal";
import css from "../WaterItem/WaterItem.module.css";
import DeleteWaterModal from "../DeleteWaterModal/DeleteWaterModal.jsx";

const WaterItem = ({ item: { _id, time, amount } }) => {
  const [isEditModalOpen, setEditModalIsOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalIsOpen] = useState(false);

  const openModalEdit = () => setEditModalIsOpen(true);
  const openModalDelete = () => setDeleteModalIsOpen(true);

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const isPM = hours >= 12;
    const formattedHours = hours % 12 || 12; // Преобразование 0 и 12 в 12-часовой формат
    const period = isPM ? "PM" : "AM";
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  return (
    <>
      <div className={css.waterContainer}>
        {/* <svg>
                  <use href="src/assets/sprite.svg#icon-glass" />
                </svg> */}
        <div className={css.details}>
          <span className={css.amount}>{amount} ml</span>
          <span className={css.time}>{formatTime(time)}</span>
        </div>
        <div className={css.actions}>
          <button
            className={css.actionButton}
            onClick={() => {
              openModalEdit(
                <WaterModal
                  operationType="edit"
                  id={_id}
                  amount={amount}
                  myTime={time}
                />
              );
            }}
          >
            <svg
              width={14}
              height={14}
              className={css.btnSvg}
              //   style={{ stroke: "var(--main)" }}
            >
              <use href="src/assets/sprite.svg#icon-upload"></use>
            </svg>
          </button>
          <button
            className={css.actionButton}
            onClick={() => {
              openModalDelete(<DeleteWaterModal id={_id} />);
            }}
            type="button"
            aria-label="Delete item"
          >
            <svg width={14} height={14} className={css.btnSvg}>
              <use href="src/assets/sprite.svg#icon-trash" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default WaterItem;
