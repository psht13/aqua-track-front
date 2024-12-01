<<<<<<< Updated upstream
import { Route, Routes } from "react-router";
import HomePage from "../pages/home-page/HomePage";
import SharedLayout from "../components/sharedLayout/SharedLayout";
import SignInPage from "../pages/signin-page/SignInPage";
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
=======
import { useDispatch, useSelector } from "react-redux";
import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";

import styles from "./App.module.css"; 

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const SignInPage = lazy(() => import("../pages/SignInPage/SignInPage"));
const SignUpPage = lazy(() => import("../pages/SignUpPage/SignUpPage"));
const TrackerPage = lazy(() => import("../pages/TrackerPage/TrackerPage"));

import Layout from "../components/Layout";
import Loader from "../components/Loader/Loader";
import { selectAuthIsRefreshing } from "../redux/selectors";
import { apiRefreshUser } from "../redux/operations";
import RestrictedRoute from "../components/RestrictedRoute";
import PrivateRoute from "../components/PrivateRoute";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectAuthIsRefreshing);

  useEffect(() => {
    dispatch(apiRefreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return null; 
  }

  return (
    <div className={styles.container}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            {/* Публічні маршрути */}
            <Route
              path="/signin"
              element={
                <RestrictedRoute component={<SignInPage />} redirectTo="/tracker" />
              }
            />
            <Route
              path="/signup"
              element={
                <RestrictedRoute component={<SignUpPage />} redirectTo="/tracker" />
              }
            />
            {/* Приватний маршрут для Tracker */}
            <Route
              path="/tracker"
              element={<PrivateRoute component={<TrackerPage />} />}
            />
          </Route>
        </Routes>
      </Suspense>
      <Toaster />
>>>>>>> Stashed changes
    </div>
  );
}

export default App;