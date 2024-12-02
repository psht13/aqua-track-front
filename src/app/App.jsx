import { Route, Routes } from "react-router-dom";
import { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SharedLayout from "../components/SharedLayout/SharedLayout";
import PublicRoute from "../components/PublicRoute";
import PrivateRoute from "../components/PrivateRoute";
import css from "./App.module.css";
import { selectAuthIsRefreshing } from "../redux/selectors";
import { apiRefreshUser } from "../redux/operations";
import { Suspense } from "react";

// Лейзі імпорти для сторінок
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const SignInPage = lazy(() => import("../pages/SignInPage/SignInPage"));
const SignUpPage = lazy(() => import("../pages/SignUpPage/SignUpPage"));
const TrackerPage = lazy(() => import("../pages/TrackerPage/TrackerPage"));

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectAuthIsRefreshing);

  useEffect(() => {
    dispatch(apiRefreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <div className={css.container}>
      <Suspense fallback={<div>Loading...</div>}>
        {" "}
        <Routes>
          <Route path="/" element={<SharedLayout />}>
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
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
