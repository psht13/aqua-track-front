// import WaterProgressBar from './WaterProgressBar/WaterProgressBar';
// import WaterDailyNorma from './WaterDailyNorma/WaterDailyNorma';
// import AddWaterBtn from '../WaterDetailedInfo/DailyInfo/AddWaterBtn/AddWaterBtn'; // Подключаем кнопку
// import bottle from '../../../assets/imgs/TrackerPage/bottle.png'; // Подключаем картинку бутылки
// import { useState } from 'react'; // Подключаем хук для управления состоянием
// import styles from './WaterMainInfo.module.css';

// const WaterMainInfo = () => {
//   const dailyNorma = 1.5; // Дневная норма воды
//   const waterConsumed = 0.75; // Количество уже потребленной воды
//   const progress = Math.min((waterConsumed / dailyNorma) * 100, 100); // Расчет прогресса

//   const [selectedDate] = useState('Today'); // Состояние для текущей даты

//   // Функция для обработки открытия модального окна
//   const handleAddWater = () => {
//     // Логика для взаимодействия с бэкендом или контекстом модальных окон
//     console.log('Открытие модального окна для добавления воды');
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.logo}>AQUATRACK</div>
//       <div className={styles.header}>
//         <WaterDailyNorma norma={dailyNorma} />
//       </div>
//       <div className={styles.bottleWrapper}>
//         <img src={bottle} alt="Water Bottle" className={styles.bottle} />
//       </div>
//       <WaterProgressBar progress={progress} date={selectedDate} />
//       <div className={styles.buttonWrapper}>
//         <AddWaterBtn onClick={handleAddWater} />
//       </div>
//     </div>
//   );
// };

// export default WaterMainInfo;
