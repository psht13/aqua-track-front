import { useEffect, useState } from "react";
import AdvantagesSection from "../../components/advantagesSection/AdvantagesSection";
import SignInForm from "../../components/signInForm/SignInForm";
import styles from "./SignInPage.module.css";

const SignInPage = () => {
	const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1440);

	useEffect(() => {
		const handleResize = () => setIsDesktop(window.innerWidth >= 1440);
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<main className={styles.main}>
			<SignInForm />
			{isDesktop && <AdvantagesSection />}
		</main>
	);
};

export default SignInPage;
