import css from "./AddWaterBtn.module.css";

const AddWaterBtn = () => {
  const openModal = () => {
    return;
  };

  return (
    <button className={css.addBtn} onClick={openModal}>
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
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5 12H19"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <p>Add water</p>
    </button>
  );
};

export default AddWaterBtn;
