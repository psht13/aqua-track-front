import Logo from "../../components/logo/Logo";
import AdvantageSection from "../../components/advantagesSection/AdvantagesSection";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import css from "./SignUpPage.module.css";

function SignUpPage() {
  return (
    <div className={css.page}>
      <section className={css.leftSection}>
        <SignUpForm />
      </section>
      <section className={css.rightSection}>
        <AdvantageSection />
      </section>
    </div>
  );
}
export default SignUpPage;
