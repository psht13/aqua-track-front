// import { useState } from "react";
import css from "./WaterProgressBar.module.css";
// import { useSelector } from "react-redux";

const WaterProgressBar = () => {
  const progressPercent = 50;
  // const progressPercent = useSelector()

  return (
      <div className={css.card}>
        <p className={css.today}>Today</p>
        <div
          className={css.barWrap}
          style={{ "--progress-percent": `${progressPercent}%` }}
        >
          <span className={css.bar}>
            <span className={css.active}></span>
            <div className={css.circleWrap}>
              <svg className={css.circle} width="12" height="12">
                <circle cx="6" cy="6" r="5.5" fill="white" stroke="#9BE1A0" />
              </svg>
              <span className={css.percent}>{`${progressPercent}%`}</span>
            </div>
          </span>
          <ul className={css.percents}>
            <li>
              <p>0%</p>
            </li>
            <li>
              <p>50%</p>
            </li>
            <li>
              <p>100%</p>
            </li>
          </ul>
        </div>
      </div>
  );
};

export default WaterProgressBar;
