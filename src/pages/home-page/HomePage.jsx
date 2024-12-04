import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";

import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <main className={styles.main}>
      <WelcomeSection />
      <AdvantagesSection />
    </main>
  );
};

export default HomePage;
