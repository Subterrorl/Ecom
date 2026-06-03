//rafce
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebaradmin = () => {
  return (
    <div className="bg-gray-800 w-64 text-gray-100 flex flex-col h-screen">
      <div className="h-24 bg-gray-900 flex items-center justify-center text-2xl font-bold">Admin Panel</div>
      <nav className="flex-1 px-4 py-4">
        <NavLink>Dashboard</NavLink>
      </nav>
      <div>Footer</div>
    </div>
  );
};

export default Sidebaradmin;
