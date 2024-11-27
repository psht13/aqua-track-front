import { Route, Routes } from "react-router";

import HomePage from "../pages/home-page/HomePage";
import css from "./App.module.css";
<<<<<<< HEAD
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
=======
import SharedLayout from "../components/sharedLayout/SharedLayout";

const App = () => {
  return (
    <div className={css.container}>
      <Routes>
        <Route
          path="/"
          element={<SharedLayout />}>
          <Route
            path="/"
            element={<HomePage />}
          />
        </Route>
      </Routes>
>>>>>>> be03cc6d1d7c3d947d3ac56a0daad06e71544284
    </div>
  );
};

export default App;
