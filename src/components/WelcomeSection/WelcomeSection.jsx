import { NavLink } from "react-router";
import Logo from "../Logo/Logo";
import styles from "./WelcomeSection.module.css";

const WelcomeSection = () => {
	return (
		<section className={styles.welcomeSection}>
			<header className={styles.header}>
				<Logo />
			</header>
			<div className={styles.content}>
				<p className={styles.subtitle}>Record daily water intake and track</p>
				<h1 className={styles.title}>Water consumption tracker</h1>
				<div className={styles.buttons}>
					<NavLink
						to='/signup'
						className={styles.tryTracker}
						aria-label='Try water tracker app'
					>
						Try tracker
					</NavLink>
					<NavLink
						to='/signin'
						className={styles.signIn}
						aria-label='Sign in to water tracker app'
					>
						Sign In
					</NavLink>
				</div>
			</div>
		</section>
	);
};

export default WelcomeSection;
