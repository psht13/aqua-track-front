import { useState } from "react";
import WaterModal from "../../components/WaterModal/WaterModal";
import css from "../WaterItem/WaterItem.module.css";
import DeleteWaterModal from "../DeleteWaterModal/DeleteWaterModal.jsx";
import { FaGlassWhiskey } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

const WaterItem = ({ item: { id, date, amount } }) => {
  const [isEditModalOpen, setEditModalIsOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalIsOpen] = useState(false);

  const openModalEdit = () => setEditModalIsOpen(true);
  const closeModalEdit = () => setEditModalIsOpen(false);

  const openModalDelete = () => setDeleteModalIsOpen(true);
  const closeModalDelete = () => setDeleteModalIsOpen(false);

  const formatTime = (isoDate) => {
    const dateObj = new Date(isoDate);
    return dateObj.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <>
      <div className={css.waterContainer}>
        <div className={css.icon}>
          <FaGlassWhiskey
            color="var(--accent)"
            fontSize={'24px'}
          />
        </div>
        <div className={css.details}>
          <span className={css.amount}>{amount} ml</span>
          <span className={css.time}>{formatTime(date)}</span>
        </div>
        <div className={css.actions}>
          <button
            className={css.actionButton}
            onClick={openModalEdit}>
            <MdEdit />
          </button>
          <button
            className={css.actionButton}
            onClick={openModalDelete}
            type="button"
            aria-label="Delete item">
            <FaRegTrashAlt />
          </button>
        </div>
      </div>

      {isEditModalOpen && (
        <WaterModal
          operationType="edit"
          id={id}
          waterPortion={amount}
          myTime={date}
          onClose={closeModalEdit}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteWaterModal
          id={id}
          onClose={closeModalDelete}
        />
      )}
    </>
  );
};

export default WaterItem;
