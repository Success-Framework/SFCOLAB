import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/sections/NavBar";
import SideBar from "../components/sections/SideBar";
import MobileNavBar from "../components/sections/MobileNavBar";
import Options from "../components/sections/Options";
import useScrollHide from "../hooks/useScrollHide";

const Layout = () => {
  const { isHidden: isNavHidden, onScroll } = useScrollHide({
    deltaThreshold: 4,
    topReveal: 10,
  });

  return (
    <div className="h-screen w-screen bg-[#000000] overflow-hidden flex flex-col">
      {/* Collapsible Top Nav Container (always visible on lg+) */}
      <div
        className={`w-full overflow-hidden transition-[max-height] duration-300 ease-in-out ${isNavHidden ? "h-0" : "h-[60px]"
          } lg:h-[60px]`}
      >
        <NavBar isHidden={isNavHidden} />
      </div>

      <div className="relative flex-1 w-full flex overflow-hidden">
        {/* Desktop Sidebar - Hidden on mobile */}
        <div className="hidden sm:block">
          <SideBar />
        </div>
        {/* Main Content Area */}
        <div className="text-white flex flex-col w-full p-5 max-sm:px-4 max-sm:py-0 gap-10 overflow-hidden pb-16 sm:pb-0">
          <div
            className="w-full h-[100%] pt-3.5 max-sm:pb-16 overflow-y-auto overflow-x-hidden"
            onScroll={onScroll}
          >
            <div className=""><Options isHidden={isNavHidden} /></div>
            <Outlet />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Bar - Only visible on mobile */}
      <MobileNavBar isHidden={isNavHidden} />
    </div>
  );
};

export default Layout;
