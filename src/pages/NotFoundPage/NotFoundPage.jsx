import css from "./NotFoundPage.module.css";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <section className={css.section404}>
      <h1 className={css.title404}>404</h1>
      <div className={css.container404}>
        <p className={css.mesage404}>{`Look like you're lost the page!`}</p>
        <button onClick={goToHome} className={css.link404}>
          Go to Home
        </button>
      </div>
    </section>
  );
};

export default NotFoundPage;
