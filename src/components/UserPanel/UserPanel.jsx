import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/user/operations';
import { selectUser } from '../../redux/user/selectors'; 
import css from './UserPanel.module.css';
import sprite from '../../assets/sprite.svg';

const UserPanel = ({ setOpenSetting }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    dispatch(getUser()); // Загружаем данные о пользователе при монтировании
  }, [dispatch]);

  const getDisplayName = (name, email) => {
    if (name && name !== 'User') {
      return name;
    } else if (email) {
      return email.split('@')[0];
    } else {
      return 'Guest';
    }
  };

  const email = user?.email;
  const name = user?.name;
  const displayName = getDisplayName(name, email);

  const handleOpenModal = (modalType) => {
    setOpenSetting(modalType); // Передаём управление модальным окном
  };

  return (
    <div className={css.panelWrapper}>
      <header className={css.header}>
        <h1 className={css.greeting}>
          Hello, <span className={css.username}>{displayName}!</span>
        </h1>
        <div className={css.userMenu}>
          <button
            onClick={() => setMenuVisible(!menuVisible)}
            className={css.menuButton}
          >
            <span className={css.userName}>{displayName}</span>
            <div className={css.avatar}></div>
            <svg className={css.icon}>
              <use
                href={`src/assets/sprite.svg#icon-chevron-${
                  menuVisible ? 'up' : 'down'
                }`}
              />
            </svg>
          </button>
          {menuVisible && (
            <div className={css.menu}>
              <button
                onClick={() => handleOpenModal('settings')}
                className={css.menuItem}
              >
                <svg className={css.icon}>
                  <use href={`${sprite}#icon-settings`} />
                </svg>
                Setting
              </button>
              <button
                onClick={() => handleOpenModal('logout')}
                className={css.menuItem}
              >
                <svg className={css.icon}>
                  <use href={`${sprite}#icon-log-out`} />
                </svg>
                Log out
              </button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default UserPanel;
