import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/sections/NavBar";
import SideBar from "../components/sections/SideBar";
import MobileNavBar from "../components/sections/MobileNavBar";
import Options from "../components/sections/Options";

const Layout = () => {
  const location = useLocation();
  const isChatPage = location.pathname === "/messages";

  const [isNavHidden, setIsNavHidden] = React.useState(false);
  const scrollContainerRef = React.useRef(null);
  const lastScrollTopRef = React.useRef(0);
  const tickingRef = React.useRef(false);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const currentTop = scrollContainerRef.current.scrollTop;

    if (!tickingRef.current) {
      window.requestAnimationFrame(() => {
        const delta = currentTop - lastScrollTopRef.current;
        const isScrollingDown = delta > 4;
        const isScrollingUp = delta < -4;

        if (currentTop <= 10) {
          setIsNavHidden(false);
        } else if (isScrollingDown) {
          setIsNavHidden(true);
        } else if (isScrollingUp) {
          setIsNavHidden(false);
        }

        lastScrollTopRef.current = currentTop <= 0 ? 0 : currentTop;
        tickingRef.current = false;
      });
      tickingRef.current = true;
    }
  };

  return (
    <div className="h-screen w-screen bg-[#000000] overflow-hidden flex flex-col">
      {/* Collapsible Top Nav Container (always visible on lg+) */}
      <div
        className={`w-full overflow-hidden transition-[max-height] duration-300 ease-in-out ${isNavHidden ? "h-0" : "h-[60px]"
          } lg:h-[60px]`}
      >
        <NavBar isHidden={isNavHidden} />
      </div>

      {isChatPage ? (
        <div className="w-full flex-1 overflow-hidden pb-16 sm:pb-0">
          <Outlet />
        </div>
      ) : (
        <div className="relative flex-1 w-full flex overflow-hidden">
          {/* Desktop Sidebar - Hidden on mobile */}
          <div className="hidden sm:block">
            <SideBar />
          </div>
          {/* Main Content Area */}
          <div className="text-white flex flex-col w-full p-5 max-sm:px-4 max-sm:py-0 gap-10 overflow-hidden pb-16 sm:pb-0">
            <div
              className="w-full h-[100%] pt-3.5 max-sm:pb-10 overflow-y-auto overflow-x-hidden"
              onScroll={handleScroll}
              ref={scrollContainerRef}
            >
              <div className=""><Options isHidden={isNavHidden} /></div>
              <Outlet />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation Bar - Only visible on mobile */}
      <MobileNavBar isHidden={isNavHidden} />
    </div>
  );
};

export default Layout;
