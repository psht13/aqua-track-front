import AdvantagesSection from "../../components/advantagesSection/AdvantagesSection";
import WelcomeSection from "../../components/welcomeSection/WelcomeSection";
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
