// import { useState } from "react";
import { useEffect, useState } from "react";
import { selectTodayWater } from "../../redux/water/selectors";
import css from "./WaterProgressBar.module.css";
import { useSelector } from "react-redux";
import { selectDailyNorm } from "../../redux/user/selectors";

const WaterProgressBar = () => {
  const [progressPercent, setProgressPercent] = useState(0);
  const todayWaterList = useSelector(selectTodayWater);
  const dailyNorm = useSelector(selectDailyNorm);
  const waterData = todayWaterList || [];
  let totalWater = 0;

  useEffect(() => {
    if (waterData.length) {
      waterData.map((item) => {
        totalWater += item.amount;
      });
      setProgressPercent(totalWater / (dailyNorm / 100));
    }
  }, [waterData, dailyNorm]);

  return (
    <div className={css.card}>
      <p className={css.today}>Today</p>
      <div
        className={css.barWrap}
        style={{
          "--progress-percent": `${
            (progressPercent <= 100 ? progressPercent : 100) || 0
          }%`,
        }}
      >
        <span className={css.bar}>
          <span className={css.active}></span>
          <div className={css.circleWrap}>
            <svg className={css.circle} width="12" height="12">
              <circle cx="6" cy="6" r="5.5" fill="white" stroke="#9BE1A0" />
            </svg>
            <span className={css.percent}>{`${
              progressPercent.toFixed(0) || 0
            }%`}</span>
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
