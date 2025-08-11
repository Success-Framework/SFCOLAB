import { BellDot, SquareMenu } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { allimg } from "../../utils";
import { useAuth } from "../../contexts/AuthContext";
import { AiOutlineSetting } from "react-icons/ai";

const NavBar = ({ isHidden = false }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const menuRef = useRef(null);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!activeDropdown) return;

    const handleClickOutside = (event) => {
      // Check which dropdown is open and if click is outside its ref
      if (
        (activeDropdown === "menu" &&
          menuRef.current &&
          !menuRef.current.contains(event.target)) ||
        (activeDropdown === "notification" &&
          notificationRef.current &&
          !notificationRef.current.contains(event.target)) ||
        (activeDropdown === "profile" &&
          profileRef.current &&
          !profileRef.current.contains(event.target))
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

  const handleDropdownClick = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <nav
      className={`flex px-5 items-center w-full h-full justify-between relative border-b border-[#262626] transition-transform duration-300 will-change-transform ${isHidden ? "-translate-y-full" : "translate-y-0"
        } lg:translate-y-0`}
    >
      {/* logo */}
      <div className="logo">
        <Link className="text-white text-xl font-bold">SFCOLAB</Link>
      </div>

      {/* main content */}
      <div className="flex content items-center h-full gap-4">
        {/* messages dropdown */}
        <div className="relative sm:hidden">
          <Link to="/setting" className="text-xl font-medium text-[#C4C4C4]">
            <AiOutlineSetting className="text-2xl" />
          </Link>
        </div>

        {/* notification dropdown */}
        <div className="relative max-sm:hidden" ref={notificationRef}>
          <button
            onClick={() => handleDropdownClick("notification")}
            className="text-xl font-medium text-[#C4C4C4]"
          >
            <BellDot className="text-2xl" />
          </button>
          {activeDropdown === "notification" && (
            <div className="absolute right-0 mt-2 w-48 bg-[#120C18] rounded-lg shadow-lg py-2 z-50">
              <div className="px-4 py-2 text-white">No new notifications</div>
            </div>
          )}
        </div>

        {/* profile dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => handleDropdownClick("profile")}
            className="w-10 h-10 rounded-full overflow-hidden"
          >
            <img
              src={allimg.profileImg}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </button>
          {activeDropdown === "profile" && (
            <div className="absolute right-0 mt-2 w-48 bg-[#120C18] rounded-lg shadow-lg py-2 z-50">
              <Link
                to="/profile"
                className="block px-4 py-2 text-white hover:bg-white/10"
              >
                Profile
              </Link>
              <Link
                to="/setting"
                className="block px-4 py-2 text-white hover:bg-white/10"
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-white hover:bg-white/10"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
