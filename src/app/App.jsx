import { Route, Routes } from "react-router";
import HomePage from "../pages/HomePage/HomePage";
import SharedLayout from "../components/SharedLayout/SharedLayout";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import css from "./App.module.css";

const App = () => {
  return (
    <div className={css.container}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
