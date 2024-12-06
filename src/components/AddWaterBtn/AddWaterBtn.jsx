import { useState } from "react";
import WaterModal from "../WaterModal/WaterModal";
import css from "./AddWaterBtn.module.css";

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
        <svg
          className={css.plus}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5V19"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 12H19"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
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
