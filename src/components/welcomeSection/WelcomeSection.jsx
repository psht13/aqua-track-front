import styles from "./WelcomeSection.module.css";
import Logo from "../logo/Logo";
import { Link } from "react-router";

const WelcomeSection = () => {
  return (
    <section className={styles.container}>
      <Logo />
      <h2 className={styles.subtitle}>Track your daily water intake</h2>
      <h1 className={styles.title}>Welcome to AquaTrack</h1>
      <div className={styles.links}>
        <Link
          to="/signup"
          className={styles.linkPrimary}>
          Try tracker
        </Link>
        <Link
          to="/signin"
          className={styles.linkSecondary}>
          Sign In
        </Link>
      </div>
    </section>
  );
};

export default WelcomeSection;
