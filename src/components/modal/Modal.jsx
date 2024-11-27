import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import css from "./Modal.module.css";

const Modal = ({ children, onClose }) => {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(true);

  const dynamicStyle = clsx(css.backdrop, active && css.active);

  const handleCloseModal = useCallback(
    (e) => {
      if (e.target === e.currentTarget || e.code === "Escape") {
        setActive(false);
        setTimeout(() => {
          setVisible(false);
          onClose();
        }, 300);
      }
    },
    [onClose]
  );

  useEffect(() => {
    const id = setTimeout(() => {
      setActive(true);
    }, 100);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleCloseModal);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleCloseModal);
      document.body.removeAttribute("style");
    };
  }, [handleCloseModal]);

  if (!visible) return null;

  return (
    <div className={dynamicStyle} onClick={handleCloseModal}>
      <div className={css.modalContent}>
        {children}
        <button
          type="button"
          className={css.closeButton}
          onClick={() => handleCloseModal({ code: "Escape" })}
        >
          <svg
            width={12}
            height={12}
            className={css.icon}
            style={{ stroke: "#2F2F2F", fill: "transparent" }}
          >
            <use href="src/assets/sprite.svg#icon-x"></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Modal;
