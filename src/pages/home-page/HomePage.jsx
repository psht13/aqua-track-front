import AdvantagesSection from "../../components/advantagesSection/AdvantagesSection";
import UserSettingsForm from "../../components/user-settings-form/UserSettingsForm";
import WelcomeSection from "../../components/welcomeSection/WelcomeSection";

const HomePage = () => {
  return (
    <main>
      <WelcomeSection />
      <AdvantagesSection />
      <UserSettingsForm />
    </main>
  );
};

export default HomePage;
