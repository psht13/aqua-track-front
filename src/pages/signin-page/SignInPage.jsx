import Logo from '../../components/logo/Logo';
import AdvantageSection from '../../components/advantagesSection/AdvantagesSection'; 
import SignInForm from '../../components/SignInForm/SignInForm';
import css from './SignInPage.module.css';

function SignInPage() {
  const isDesktop = window.innerWidth >= 1024;
  return (
    <div className={css.page}>
      <div className={css.leftSection}>
        <Logo className={css.logo} />
        <div className={css.formWrapper}>
          <SignInForm />
        </div>
      </div>
      {isDesktop && (
        <div className={`${css.rightSection} desktop`}>
          <AdvantageSection />
        </div>
      )}
    </div>
  );
}
export default SignInPage;