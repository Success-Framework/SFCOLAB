import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Users, Brain, Lightbulb, MessageCircle, BellDot } from "lucide-react";

const MobileNavBar = () => {
  const location = useLocation();

  const navItems = [
    {
      path: "/",
      icon: Home,
      label: "Home",
      isActive: location.pathname === "/" || location.pathname === "/home",
    },
    {
      path: "/projects",
      icon: Users,
      label: "Contributors",
      isActive: location.pathname === "/projects",
    },
    {
      path: "/knowledge",
      icon: Lightbulb,
      label: "K.Base",
      isActive: location.pathname === "/knowledge",
    },
    {
      path: "/notification",
      icon: BellDot,
      label: "Notifications",
      isActive: location.pathname === "/notification",
    },
    {
      path: "/messages",
      icon: MessageCircle,
      label: "Messages",
      isActive: location.pathname === "/messages",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1A1A1A] border-t border-[#262626] px-4 py-2 z-50 sm:hidden">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
                item.isActive
                  ? "text-white bg-white/10"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <IconComponent size={20} strokeWidth={1.5} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavBar;
