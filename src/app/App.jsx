import { Route, Routes } from "react-router";
import { Suspense } from "react";
import Loader from "../components/loader/Loader";
import SharedLayout from "../components/SharedLayout/SharedLayout";
import Modal from "../components/modal/Modal";
import { useState } from "react";

import HomePage from "../pages/home-page/HomePage";
import css from "./App.module.css";
const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
      <button onClick={() => setModalOpen(true)}>
        Відкрити модальне вікно
      </button>
      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <h2>Привіт! Це модальне вікно.</h2>
          <p>Це приклад контенту.</p>
        </Modal>
      )}
      <div className={css.container}>
        <Suspense fallback={<Loader />}>
          <SharedLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </SharedLayout>
        </Suspense>
      </div>
    </>
  );
};

export default App;
