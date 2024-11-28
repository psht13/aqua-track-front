// AdvantagesSection.jsx
// import React from "react";
import styles from "./AdvantagesSection.module.css";

const AdvantagesSection = () => {
	return (
		<section className={styles.advantagesSection}>
			<div className={styles.content}>
				<div className={styles.badge}>
					<img
						src='/src/assets/imgs/advantage-section/memojis1.jpg'
						alt='User 1'
						className={styles.avatar}
					/>
					<img
						src='/src/assets/imgs/advantage-section/memojis2.jpg'
						alt='User 2'
						className={styles.avatar}
					/>
					<img
						src='/src/assets/imgs/advantage-section/memojis3.jpg'
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
