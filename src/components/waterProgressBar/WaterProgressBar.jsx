import css from "./WaterProgressBar.module.css";

const WaterProgressBar = (props) => {
  return (
    <div className={css.back}>
      <div className={css.card}>
        <p className={css.today}>Today</p>
        <progress value={0.5}>Progress Bar</progress>
      </div>
    </div>
  );
};

export default WaterProgressBar;
