import { Helmet } from "react-helmet-async";
import AdvantageSection from "../../components/AdvantagesSection/AdvantagesSection";
import SignInForm from "../../components/SignInForm/SignInForm";
import css from "./SignInPage.module.css";

function SignInPage() {
  return (
    <>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <div className={css.page}>
        <div className={css.leftSection}>
          <SignInForm />
        </div>
        <div className={`${css.rightSection} desktop`}>
          <AdvantageSection />
        </div>
      </div>
    </>
  );
}

export default SignInPage;