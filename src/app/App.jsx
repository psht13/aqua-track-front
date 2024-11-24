import { Route, Routes } from "react-router";
import { Suspense } from "react";

import HomePage from "../pages/home-page/HomePage";
import Loader from "../components/loader/Loader";
import css from "./App.module.css";
const App = () => {
  return (
    <div className={css.container}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
