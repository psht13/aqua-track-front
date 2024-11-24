import React from "react";
import styles from "./Logo.module.scss";

const Logo = () => {
	return (
		<div className={styles.logo}>
			<span className={styles.hiddenText}>AquaTrack Logo</span>
		</div>
	);
};
export default Logo;
