import { Outlet } from 'react-router-dom';
import { Suspense } from "react";

import Loader from "../components/Loader/Loader";

const Layout = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Outlet /> {/* Рендеримо дочірні маршрути */}
      </Suspense>
    </div>
  );
};

export default Layout;