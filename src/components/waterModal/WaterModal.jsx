import css from "./WaterModal.module.css";
import WaterForm from "../waterForm/WaterForm";
import Modal from "../modal/Modal";

const WaterModal = ({
  onClose,
  operationType = "add",
  id,
  waterPortion,
  myTime,
}) => {
  return (
    <Modal onClose={onClose}>
      <h3 className={css.title}>
        {operationType === "edit"
          ? "Edit the entered amount of water"
          : "Add water"}
      </h3>
      <p className={css.subtitle}>
        {operationType === "edit" ? "Correct entered data:" : "Choose a value"}
      </p>
      <WaterForm
        id={id}
        waterPortion={waterPortion}
        operationType={operationType}
        myTime={myTime}
      />
    </Modal>
  );
};

export default WaterModal;
