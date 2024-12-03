// import { useState } from 'react';
// import WaterMainInfo from './WaterMainInfo/WaterMainInfo';
// import WaterDetailedInfo from './WaterDetailedInfo/WaterDetailedInfo';
// import styles from './TrackerPage.module.css';

// const TrackerPage = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Текущая дата
//   const [waterData, setWaterData] = useState({
//     "2024-11-29": 0.75,
//     "2024-11-28": 1.2,
//   }); // Данные по дням

//   const dailyNorma = 1.5; // Дневная норма воды

//   /**
//    * Обновляет данные о потреблении воды для выбранной даты
//    * @param {string} date - Дата в формате YYYY-MM-DD
//    * @param {number} amount - Количество добавленной воды
//    */
//   const updateWaterData = (date, amount) => {
//     if (amount <= 0) return; // Валидация: игнорируем некорректные значения
//     setWaterData((prev) => ({
//       ...prev,
//       [date]: (prev[date] || 0) + amount,
//     }));
//   };

//   return (
//     <div className={styles.container}>
//       <WaterMainInfo
//         selectedDate={selectedDate}
//         waterData={waterData}
//         dailyNorma={dailyNorma}
//         updateWaterData={updateWaterData}
//       />
//       <WaterDetailedInfo
//         selectedDate={selectedDate}
//         setSelectedDate={setSelectedDate}
//       />
//     </div>
//   );
// };

// export default TrackerPage;



// //Напиши небольшое рюзюме про этот файл. За что он отвечает, что импортирует, за что отвечает, с чем связан. Так, чтобы по описанию было понятно какой код содержит этот файл, чтобы было понятно дублируются ли функции, правильно ли написано взаимодействие.