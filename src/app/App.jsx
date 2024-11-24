import { Route, Routes } from "react-router";
import { Suspense } from "react";

import HomePage from "../pages/home-page/HomePage";
import Loader from "../components/loader/Loader";
import css from "./App.module.css";
import WaterMainInfo from "../components/waterMainInfo/WaterMainInfo";
const App = () => {
  return (
    <div className={css.container}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/water" element={<WaterMainInfo />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
