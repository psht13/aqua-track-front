import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../redux/auth/operations";

import Modal from "../Modal/Modal.jsx";
import css from "./LogOutModal.module.css";
import { clearUser } from "../../redux/user/slice.js";
import { clearWater } from "../../redux/water/slice.js";

const LogOutModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut()).then(() => {
      dispatch(clearUser());
      dispatch(clearWater());
      navigate('/signin');
      
      onClose();
    });
  };

  return (
    <Modal widthStyle onClose={onClose}>
      <div className={css.box}>
        <div className={css.textBox}>
          <h3 className={css.title}>Log out</h3>
          <p className={css.text}>Do you really want to leave?</p>
        </div>
        <div className={css.buttonBox}>
          <button className={css.btnLogOut} onClick={handleLogout}>
            Log out
          </button>
          <button
            className={css.btnCancel}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LogOutModal;
