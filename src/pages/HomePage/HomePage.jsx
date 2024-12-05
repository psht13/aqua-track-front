import { Helmet } from "react-helmet-async";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <main className={styles.main}>
        <WelcomeSection />
        <AdvantagesSection />
      </main>
    </>
  );
};

export default HomePage;