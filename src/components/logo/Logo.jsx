import { NavLink } from "react-router";
import styles from "./Logo.module.css";

const Logo = () => {
	return (
		<NavLink
			to='/'
			className={styles.logo}
			aria-label='Home page'
		>
			AquaTrack
			</NavLink>
	);
};

export default Logo;
