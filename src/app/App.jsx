import { Route, Routes } from "react-router";
import HomePage from "../pages/home-page/HomePage";
import SharedLayout from "../components/sharedLayout/SharedLayout";
import SignInPage from "../pages/signin-page/SignInPage";
// import PrivateRoute from '../components/PrivateRoute';
// import PublicRoute from '../components/PublicRoute';
import css from "./App.module.css";

const App = () => {
  return (
    <div className={css.container}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
         <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </div>
  );
};

export default App;
