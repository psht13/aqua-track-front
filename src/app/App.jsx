import { Route, Routes } from "react-router";

import HomePage from "../pages/home-page/HomePage";
import css from "./App.module.css";
import SharedLayout from "../components/sharedLayout/SharedLayout";
import { useState } from "react";
// import WaterModal from "../components/waterModal/WaterModal";
import DeleteWaterModal from "../components/deleteWaterModal/DeleteWaterModal";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div>
        <button type="button" onClick={openModal}>
          Open Water Modal
        </button>
        {isModalOpen && <DeleteWaterModal onClose={closeModal} />}
      </div>
      <div className={css.container}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
