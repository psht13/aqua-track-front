import styles from "./Logo.module.css";

const Logo = () => {
	const handleClick = () => {
		window.location.href = "/";
	};

	return (
		<div
			className={styles.logo}
			onClick={handleClick}
		>
			AquaTrack
		</div>
	);
};

export default Logo;
