import css from "./DeleteWaterModal.module.css";
import Modal from "../Modal/Modal";

import { useDispatch } from "react-redux";
import { deleteWater } from "../../redux/water/operations";

const DeleteWaterModal = ({  onClose }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteWater({ id }));
    onClose();
  };

  return (
    <>
      <Modal onClose={onClose}>
        <div className={css.deleteWaterModal}>
          <h3 className={css.title}>Delete entry</h3>

          <p className={css.subtitle}>
            Are you sure you want to delete the entry?
          </p>
          <div className={css.boxButton}>
            <button
              className={css.buttonDelete}
              type="button"
              onClick={handleDelete}
            >
              Delete
            </button>

            <button
              className={css.buttonCancel}
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteWaterModal;
