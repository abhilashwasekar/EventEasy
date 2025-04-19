import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/images/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate 1s loading
    return () => clearTimeout(timer);
  }, []);

  const Skeleton = ({ width, height, rounded = "rounded" }) => (
    <div
      className={`bg-gray-300 dark:bg-gray-700 animate-pulse ${rounded}`}
      style={{ width, height }}
    />
  );

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow-md">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => navigate("/")}
      >
        {loading ? (
          <>
            <Skeleton width="48px" height="48px" rounded="rounded-full" />
            <Skeleton width="100px" height="24px" />
          </>
        ) : (
          <>
            <img src={logo} alt="Logo" className="h-12 w-auto" />
            <h1 className="text-2xl font-semibold dark:text-white">EventEasy</h1>
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        {loading ? (
          <>
            <Skeleton width="40px" height="40px" rounded="rounded-full" />
            <Skeleton width="120px" height="40px" rounded="rounded-lg" />
          </>
        ) : (
          <>
            <ThemeToggle />
            <button
              onClick={() => navigate("/admin-login")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
