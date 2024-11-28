import css from "./DeleteWaterModal.module.css";
import Modal from "../modal/Modal";

import { useDispatch } from "react-redux";

// import { deleteWater } from "../../redux/water/operations";
// import { useModalContext } from "../../context/useModalContext";

const deleteWater = ({ id }) => {
  return new Promise((resolve) => {
    console.log(`Fake deleteWater called for ID: ${id}`);
    setTimeout(() => resolve({ success: true }), 1000); // Симуляція затримки
  });
};

// ============
const useModalContext = () => ({
  closeModal: () => {
    console.log("Modal closed");
  },
});

// ==============

const DeleteWaterModal = ({ id, onClose }) => {
  //   const dispatch = useDispatch();
  const { closeModal } = useModalContext();

  // ======================
  const fakeDispatch = (action) => {
    if (typeof action === "function") {
      action();
    } else {
      console.log("Dispatching action:", action);
    }
  };
  // ============================

  const handleDelete = (id) => {
    fakeDispatch(deleteWater({ id }));
    closeModal();
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
              onClick={() => handleDelete(id)}
            >
              Delete
            </button>

            <button
              className={css.buttonCancel}
              type="button"
              onClick={closeModal}
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
