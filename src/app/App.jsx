import { Route, Routes } from "react-router";
import HomePage from "../pages/HomePage/HomePage";
import SharedLayout from "../components/SharedLayout/SharedLayout";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import PublicRoute from "../components/PublicRoute";
import css from "./App.module.css";

const App = () => {
  return (
    <div className={css.container}>
      <Routes>
        <Route
          path="/"
          element={<SharedLayout />}>
          <Route
            path="/"
            element={
              <PublicRoute>
                <HomePage />
              </PublicRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <PublicRoute>
                <SignInPage />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUpPage />
              </PublicRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
