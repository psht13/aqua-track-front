import { Route, Routes } from "react-router";
import HomePage from "../pages/home-page/HomePage";
import css from "./App.module.css";
import SharedLayout from "../components/sharedLayout/SharedLayout";

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
