//rafce
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { ChevronDown } from "lucide-react";
import { isAxiosError } from "axios";

const MainNav = () => {
  const carts = useEcomStore((state) => state.carts);
  const user = useEcomStore((state) => state.user);
  const logout = useEcomStore((state) => state.logout);
  console.log("user", user);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  console.log(carts.length);
  return (
    <nav className="bg-green-300 shadow-md">
      <div className="mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to={"/"} className="text-2xl font-bold">
              LOGO
            </Link>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-yellow-400 px-3 py-2 rounded-md text-md"
                  : "hover:bg-yellow-300 px-3 py-2 rounded-md text-md"
              }
              to={"/"}
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-yellow-400 px-3 py-2 rounded-md text-md"
                  : "hover:bg-yellow-300 px-3 py-2 rounded-md text-md"
              }
              to={"/shop"}
            >
              Shop
            </NavLink>
            {/*Badge */}
            <NavLink
              to={"/cart"}
              className={({ isActive }) =>
                isActive
                  ? "bg-yellow-400 px-3 py-2 rounded-md text-md"
                  : "hover:bg-yellow-300 px-3 py-2 rounded-md text-md"
              }
            >
              Cart
              {carts.length > 0 && (
                <span className="absolute top-0 bg-red-500 rounded-full text-white px-2">
                  {carts.length}
                </span>
              )}
            </NavLink>
          </div>
          {user ? (
            <div className="flex items-center gap-4">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 hover:bg-yellow-400 cursor-pointer px-2 py-1 rounded-md"
              >
                <img
                  className="w-10 h-10"
                  src="https://cdn-icons-png.flaticon.com/128/4322/4322991.png"
                />
                <ChevronDown />
              </button>
              {isOpen && (
                <div className="absolute mt-2 top-12 bg-white shadow-md z-50">
                  <Link
                    className="px-4 py-2 block hover:bg-yellow-200"
                    to="/user/history"
                  >
                    History
                  </Link>

                  <button
                    onClick={() => logout()}
                    className="px-4 py-2 block hover:bg-yellow-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-yellow-400 px-3 py-2 rounded-md text-md"
                    : "hover:bg-yellow-300 px-3 py-2 rounded-md text-md"
                }
                to={"/register"}
              >
                Register
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-yellow-400 px-3 py-2 rounded-md text-md"
                    : "hover:bg-yellow-300 px-3 py-2 rounded-md text-md"
                }
                to={"/login"}
              >
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
