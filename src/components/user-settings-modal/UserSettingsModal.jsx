import css from "./UserSettingsModal.module.css";
import UserSettingsForm from "../user-settings-form/UserSettingsForm";

const UserSettingsModal = ({ onClose }) => {
  return (
    <div className={css.modalOverlay} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onClose} className={css.closeBtn}>
          <svg className={css.iconX}>
            <use href="src/assets/sprite.svg#icon-x" />
          </svg>
        </button>
        <UserSettingsForm />
      </div>
    </div>
  );
};

export default UserSettingsModal;
