import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/sections/NavBar";
import SideBar from "../components/sections/SideBar";

const Layout = () => {
  const location = useLocation();
  const isChatPage = location.pathname === "/messages";
  return (
    <div className="h-screen w-screen bg-[#000000] overflow-hidden">
      <div className="w-full h-[10%]">
        <NavBar />
      </div>
      {isChatPage ? (
        <div className="w-full h-[90%] overflow-hidden">
          <Outlet />
        </div>
      ) : (
        <div className="relative h-[90%] w-full flex overflow-hidden">
          <SideBar />
          <div className="text-white flex flex-col w-full p-5 gap-10 overflow-hidden">
            <div className="w-full h-[100%] pt-3.5 overflow-y-auto overflow-x-hidden">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
