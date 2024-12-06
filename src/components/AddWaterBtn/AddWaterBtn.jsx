import { useState } from "react";
import WaterModal from "../WaterModal/WaterModal";
import css from "./AddWaterBtn.module.css";
import { FaPlus } from "react-icons/fa6";

const AddWaterBtn = ({
  className = "",
  label = "Add water",
  onClick = true,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    if (onClick) {
      setShowModal(true);
    }
  };

  return (
    <div>
      <button className={`${css.addBtn} ${className}`} onClick={handleClick}>
        {/* <svg className={css.plus} width={16} height={16}>
          <use href="src/assets/sprite.svg#icon-plus" />
        </svg> */}
        <span className={css.plus}><FaPlus fontSize={"16px"}/></span>
        <p>{label}</p>
      </button>
      {showModal && (
        <WaterModal
          onClose={() => {
            setShowModal(false);
          }}
          operationType="add"
        />
      )}
    </div>
  );
};

export default AddWaterBtn;
