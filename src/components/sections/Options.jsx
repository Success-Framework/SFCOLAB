import React from "react";
import { Link, useLocation } from "react-router-dom";

const Options = () => {
  const location = useLocation();

  return (
    <div>
      <div className="flex items-center gap-4 overflow-x-auto text-sm pb-2 ">
        <Link
          className={`px-3 py-1 rounded-full transition-colors ${
            location.pathname === "/"
              ? "border border-white text-white"
              : "text-gray-400 hover:text-white"
          }`}
          to="/"
        >
          Home
        </Link>
        <Link
          className={`px-3 py-1 rounded-full transition-colors ${
            location.pathname === "/dashboard"
              ? "border border-white text-white"
              : "text-gray-400 hover:text-white"
          }`}
          to="/dashboard"
        >
          Dashboard
        </Link>
        <Link
          className={`px-3 py-1 rounded-full transition-colors ${
            location.pathname === "/ideation"
              ? "border border-white text-white"
              : "text-gray-400 hover:text-white"
          }`}
          to="/ideation"
        >
          Ideation
        </Link>
        <Link
          className={`px-3 py-1 rounded-full transition-colors ${
            location.pathname === "/startup"
              ? "border border-white text-white"
              : "text-gray-400 hover:text-white"
          }`}
          to="/startup"
        >
          Startup
        </Link>
        <Link
          className={`px-3 py-1 rounded-full transition-colors ${
            location.pathname === "/register-startup"
              ? "border border-white text-white"
              : "text-gray-400 hover:text-white"
          }`}
          to="/register-startup"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Options;
