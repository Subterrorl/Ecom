//rafce
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebaradmin from "../components/admin/Sidebaradmin";
import HeaderAdmin from "../components/admin/HeaderAdmin";

const LayoutAdmin = () => {
  return (
    <div className="flex h-screen">
      <Sidebaradmin />

      <div className="flex-1 flex flex-col">
        <HeaderAdmin />

        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutAdmin;
