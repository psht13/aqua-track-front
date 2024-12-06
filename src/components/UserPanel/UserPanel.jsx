import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/user/operations';
import { selectUser } from '../../redux/user/selectors';
import css from './UserPanel.module.css';
import sprite from '../../assets/sprite.svg';
import UserSettingsModal from '../UserSettingsModal/UserSettingsModal';
import LogOutModal from '../LogOutModal/LogOutModal';


const UserPanel = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedWaterId, setSelectedWaterId] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    dispatch(getUser());
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

  const handleOpenModal = (modalType, waterId) => {
    setActiveModal(modalType);
    setSelectedWaterId(waterId);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setSelectedWaterId(null);
  };

  return (
		<div className={css.container}>
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
						<div className={css.avatar}>
							<img
								className={css.avatarImg}
								src={user.avatarUrl}
								alt='User avatar'
							/>
						</div>
						<svg className={css.icon}>
							<use
								href={`${sprite}#icon-vector-${menuVisible ? "up" : "down"}`}
							/>
						</svg>
					</button>
					{menuVisible && (
						<div className={css.menu}>
							<button
								onClick={() => handleOpenModal("settings")}
								className={css.menuItem}
							>
								<svg className={css.iconSettings}>
									<use href={`${sprite}#icon-settings`} />
								</svg>
								Setting
							</button>
							<button
								onClick={() => handleOpenModal("logout")}
								className={css.menuItem}
							>
								<svg className={css.iconSettings}>
									<use href={`${sprite}#icon-log-out`} />
								</svg>
								Log out
							</button>
						</div>
					)}
				</div>
			</header>
			{activeModal === "settings" && (
				<UserSettingsModal
					waterId={selectedWaterId}
					onClose={handleCloseModal}
				/>
			)}
			{activeModal === "logout" && (
				<LogOutModal
					waterId={selectedWaterId}
					onClose={handleCloseModal}
				/>
			)}
		</div>
	);
};

export default UserPanel;
