import { Route, Routes } from "react-router";
import SharedLayout from "../components/SharedLayout/SharedLayout";

import HomePage from "../pages/home-page/HomePage";
import css from "./App.module.css";

const App = () => {
  return (
    <div className={css.container}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
