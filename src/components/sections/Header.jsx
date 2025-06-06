import { BriefcaseBusiness, List, Search } from 'lucide-react'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null)
  const location = useLocation()

  const handleDropdownClick = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName)
  }

  // Function to get page title based on current path
  const getPageTitle = () => {
    const path = location.pathname
    if (path === '/') return 'Home'
    if (path === '/calendar') return 'Calendar'
    if (path === '/analytics') return 'Analytics'
    if (path === '/projects') return 'Projects'
    if (path === '/tasks') return 'Tasks'
    if (path === '/documents') return 'Documents'
    if (path === '/goals') return 'Goals'
    if (path === '/team') return 'Team'
    return 'Home'
  }

  return (
    <>
    <div className='h-full w-full flex items-center justify-between'>
        {/* nav Text */}
        <div className='text-[40px] font-[500] text-white'>
            <h1>{getPageTitle()}</h1>
        </div>

        {/* search bar */}
        <div className="flex min-w-[751px] h-full items-center gap-4">
            <div className="relative w-full h-full">
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="rounded-lg w-full h-full bg-white/10 text-white placeholder-gray-400 focus:outline-none pl-10"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
        </div>

        <div className='flex gap-3 h-full'>
            {/* Available */}
            <div className="relative h-full">
                <button 
                    onClick={() => handleDropdownClick('available')}
                    className="h-full px-6 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                    Available
                </button>
                {activeDropdown === 'available' && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#120C18] rounded-lg shadow-lg py-2 z-50">
                        <button className="block w-full text-left px-4 py-2 text-white hover:bg-white/10">Available</button>
                        <button className="block w-full text-left px-4 py-2 text-white hover:bg-white/10">Busy</button>
                        <button className="block w-full text-left px-4 py-2 text-white hover:bg-white/10">Away</button>
                        <button className="block w-full text-left px-4 py-2 text-white hover:bg-white/10">Offline</button>
                    </div>
                )}
            </div>

            {/* User Type */}
            <div className="relative h-full">
                <button 
                    onClick={() => handleDropdownClick('userType')}
                    className="h-full flex items-center gap-2 px-4 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                    <List size={20} />
                    <span>User Type</span>
                </button>
                {activeDropdown === 'userType' && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#120C18] rounded-lg shadow-lg py-2 z-50">
                        <button className="block w-full text-left px-4 py-2 text-white hover:bg-white/10">Admin</button>
                        <button className="block w-full text-left px-4 py-2 text-white hover:bg-white/10">Manager</button>
                        <button className="block w-full text-left px-4 py-2 text-white hover:bg-white/10">Employee</button>
                        <button className="block w-full text-left px-4 py-2 text-white hover:bg-white/10">Guest</button>
                    </div>
                )}
            </div>

            {/* Position */}
            <div className="relative h-full">
                <button 
                    onClick={() => handleDropdownClick('position')}
                    className="h-full flex items-center gap-2 px-4 rounded-lg bg-white text-gray-600 hover:bg-white/70 transition-colors"
                >
                    <BriefcaseBusiness size={20} />
                    <span>Position</span>
                </button>
                {activeDropdown === 'position' && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#120C18] rounded-lg shadow-lg py-2 z-50">
                        <button className="block w-full text-left px-4 py-2 text-white hover:bg-white/10">Developer</button>
                        <button className="block w-full text-left px-4 py-2 text-white hover:bg-white/10">Designer</button>
                        <button className="block w-full text-left px-4 py-2 text-white hover:bg-white/10">Product Manager</button>
                        <button className="block w-full text-left px-4 py-2 text-white hover:bg-white/10">Marketing</button>
                    </div>
                )}
            </div>
        </div>
    </div>
    </>
  )
}

export default Header