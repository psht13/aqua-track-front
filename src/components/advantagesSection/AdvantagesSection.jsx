import styles from "./AdvantagesSection.module.css";

const AdvantagesSection = () => {
	return (
		<section className={styles.container}>
			<h2 className={styles.title}>Why AquaTrack?</h2>
			<ul className={styles.list}>
				<li className={styles.item}>Track your daily water intake</li>
				<li className={styles.item}>Set personalized hydration goals</li>
				<li className={styles.item}>Stay motivated with progress tracking</li>
			</ul>
		</section>
	);
};

export default AdvantagesSection;

