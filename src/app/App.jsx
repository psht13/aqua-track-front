import { Route, Routes } from "react-router-dom";
import { lazy, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import SharedLayout from "../components/SharedLayout/SharedLayout";
import PublicRoute from "../components/PublicRoute";
import PrivateRoute from "../components/PrivateRoute";
import css from "./App.module.css";
import { selectAuthIsRefreshing } from "../redux/auth/selectors.js";
import { apiRefreshUser } from "../redux/auth/operations.js";
import { Suspense } from "react";
import Loader from "../components/Loader/Loader.jsx";

// Лейзі імпорти для сторінок
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const SignInPage = lazy(() => import("../pages/SignInPage/SignInPage"));
const SignUpPage = lazy(() => import("../pages/SignUpPage/SignUpPage"));
const TrackerPage = lazy(() => import("../pages/TrackerPage/TrackerPage"));
const NotFoundPage = lazy(() =>
  import("../pages/NotFoundPage/NotFoundPage.jsx")
);

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectAuthIsRefreshing);

  useEffect(() => {
    dispatch(apiRefreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader/>
  ) : (
    <div className={css.container}>
      <Suspense fallback={<Loader/>}>
        {" "}
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
              path="signin"
              element={
                <PublicRoute>
                  <SignInPage />
                </PublicRoute>
              }
            />
            <Route
              path="signup"
              element={
                <PublicRoute>
                  <SignUpPage />
                </PublicRoute>
              }
            />
          </Route>
          <Route
            path="/tracker"
            element={
              <PrivateRoute>
                <TrackerPage />
              </PrivateRoute>
            }
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
        <Toaster />
      </Suspense>
    </div>
  );
};

export default App;
