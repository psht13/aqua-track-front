import css from "./AddWaterBtn.module.css";

const AddWaterBtn = (props) => {
  return (
    <button className={css.addBtn}>
      <svg className={css.plus} width={16} height={16}>
        <use href="src/assets/sprite.svg#icon-plus" />
      </svg>
      <p>Add water</p>
    </button>
  );
};

export default AddWaterBtn;
