import memoji1 from '/src/assets/imgs/memojis1.jpg';
import memoji2 from '/src/assets/imgs/memojis2.jpg';
import memoji3 from '/src/assets/imgs/memojis3.jpg';
import styles from "./AdvantagesSection.module.css";

const AdvantagesSection = () => {
	return (
		<section className={styles.advantagesSection}>
			<div className={styles.content}>
				<div className={styles.badge}>
					<img
						src={memoji1}
						alt='User 1'
						className={styles.avatar}
					/>
					<img
						src={memoji2}
						alt='User 2'
						className={styles.avatar}
					/>
					<img
						src={memoji3}
						alt='User 3'
						className={styles.avatar}
					/>
					<p className={styles.customersText}>
						Our <strong>happy</strong> customers
					</p>
				</div>
				<ul className={styles.featuresList}>
					<li className={styles.habitItem}>
						<div className={styles.greenDot}></div>
						<p className={styles.habitText}>Habit drive</p>
					</li>
					<li className={styles.statisticsItem}>
						<p className={styles.featuresText}>View statistics</p>
					</li>
					<li className={styles.settingItem}>
						<p className={styles.featuresText}>Personal rate setting</p>
					</li>
				</ul>
			</div>
		</section>
	);
};

export default AdvantagesSection;
