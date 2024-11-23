import { Route, Routes } from "react-router";
import HomePage from "../pages/home-page/HomePage";
import { Suspense } from "react";
import Loader from "../components/loader/Loader";

const App = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
