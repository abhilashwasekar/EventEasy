import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/images/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const Skeleton = ({ width, height, rounded = "rounded" }) => (
    <div
      className={`bg-gray-300 dark:bg-gray-700 animate-pulse ${rounded}`}
      style={{ width, height }}
    />
  );

  return (
    <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white dark:bg-gray-900 shadow-md">
      <div
        className="flex items-center gap-3 sm:gap-4 cursor-pointer"
        onClick={() => navigate("/")}
      >
        {loading ? (
          <>
            <Skeleton width="40px" height="40px" rounded="rounded-full" />
            <Skeleton width="80px" height="20px" />
          </>
        ) : (
          <>
            <img src={logo} alt="Logo" className="h-10 w-auto sm:h-12" />
            <h1 className="text-xl sm:text-2xl font-semibold dark:text-white">EventEasy</h1>
          </>
        )}
      </div>

      <div className="flex items-center gap-2 sm:gap-4 mt-3 sm:mt-0">
        {loading ? (
          <>
            <Skeleton width="32px" height="32px" rounded="rounded-full" />
            <Skeleton width="100px" height="36px" rounded="rounded-lg" />
          </>
        ) : (
          <>
            <div className="scale-90 sm:scale-100">
              <ThemeToggle />
            </div>
            <button
              onClick={() => navigate("/admin-login")}
              className="text-sm sm:text-base px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Admin Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
