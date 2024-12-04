import css from './WaterList.module.css';
const WaterList = () => {
  const waterData = [
    { id: 1, volume: 250, time: '07:00', date: new Date(2024, 12, 29) },
    { id: 2, volume: 500, time: '12:00', date: new Date(2024, 12, 29) },
    { id: 3, volume: 300, time: '16:00', date: new Date(2024, 12, 29) }, 
    { id: 4, volume: 250, time: '18:50', date: new Date(2024, 12, 29) }, 
    { id: 5, volume: 500, time: '19:00', date: new Date(2024, 12, 29) },
    { id: 6, volume: 300, time: '22:10', date: new Date(2024, 12, 30) },
  ];

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const isPM = hours >= 12;
    const formattedHours = hours % 12 || 12; // Преобразование 0 и 12 в 12-часовой формат
    const period = isPM ? 'PM' : 'AM';
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  return (
    <div className={css.container}>
      {waterData.length > 0 ? (
        <div className={css.list}>
          {waterData.map((item) => (
            <div key={item.id} className={css.item}>
              <div className={css.icon}>
                {/* <svg>
                  <use href="src/assets/sprite.svg#icon-glass" />
                </svg> */}
              </div>
              <div className={css.details}>
                <span className={css.volume}>{item.volume} ml</span>
                <span className={css.time}>{formatTime(item.time)}</span>
              </div>
              <div className={css.actions}>
                <button className={css.actionButton}>
                  {/* <svg>
                    <use href="src/assets/sprite.svg#icon-edit-2" />
                  </svg> */}
                </button>
                <button className={css.actionButton}>
                  {/* <svg>
                    <use href="src/assets/sprite.svg#icon-trash-04" />
                  </svg> */}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className={css.noRecords}>You haven’t drunk any water yet. Time to hydrate!</p>
      )}
    </div>
  );
};

export default WaterList;
