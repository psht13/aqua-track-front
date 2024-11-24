import { Outlet } from "react-router";
import { Suspense } from "react";
import Loader from "../loader/Loader";

const SharedLayout = () => {
  return (
    <main>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default SharedLayout;
