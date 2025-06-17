import { BriefcaseBusiness, CalendarCog, File, FileChartColumnIncreasing, Flag, HelpCircle, House, Menu, Settings, SquareChartGantt, User, UserPlus, Users, X } from 'lucide-react'
import React, { useState } from 'react'
import { href, Link, useLocation } from 'react-router-dom'

const SideBar = () => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  
  // general Links
  const allLinks = [
    {
      id: 1,
      icon: <House />,
      href: '/',
    },
    {
      id: 2,
      icon: <CalendarCog />,
      href: '/dashboard',
    },
    {
      id: 3,
      icon: <FileChartColumnIncreasing />,
      href: '/ideation',
    },
    
    {
      id: 4,
      icon: <BriefcaseBusiness />,
      href: '/knowledge',
    },
    {
      id: 5,
      icon: <SquareChartGantt />,
      href: '/projects',
    },
    {
      id: 6,
      icon: <File />,
      href: '/register-startup',
    },
    {
      id: 7,
      icon:<User/>,
      href:'/startup',
    }
  ]


  const SidebarContent = () => (
    <div className='flex flex-col justify-between h-full w-full py-2.5 overflow-y-auto'>
      <div className='flex flex-col gap-4 items-center'>
        {/* general links */}
        <div className='flex flex-col gap-2 items-center'>
          {allLinks.map((link) => (
            <Link
              key={link.id}
              to={link.href}
              className={`flex items-center justify-center w-full px-2 py-2 rounded-lg transition-colors ${
                location.pathname === link.href
                  ? 'bg-[#2A2A2A] text-white'
                  : 'text-gray-400 hover:bg-[#2A2A2A] hover:text-white'
              }`}
            >
              <div className="flex items-center justify-center">
                {link.icon}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* bottom links */}
      <div className='flex flex-col gap-2 items-center'>
        <Link 
          to="/settings" 
          className={`flex items-center justify-center w-full px-2 py-2 rounded-lg transition-colors ${
            location.pathname === '/settings'
              ? 'bg-[#2A2A2A] text-white'
              : 'text-gray-400 hover:bg-[#2A2A2A] hover:text-white'
          }`}
        >
          <div className="flex items-center justify-center">
            <Settings size={20} />
          </div>
        </Link>
        <Link 
          to="/help" 
          className={`flex items-center justify-center w-full px-2 py-2 rounded-lg transition-colors ${
            location.pathname === '/help'
              ? 'bg-[#2A2A2A] text-white'
              : 'text-gray-400 hover:bg-[#2A2A2A] hover:text-white'
          }`}
        >
          <div className="flex items-center justify-center">
            <HelpCircle size={20} />
          </div>
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden fixed top-4 left-1/2 -translate-x-1/2 z-50 p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-[100px] m-4 pt-4 rounded-t-3xl text-white bg-[#1A1A1A] h-full">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <div className={`
        lg:hidden fixed inset-0 z-40 bg-[#1A1A1A] backdrop-blur-sm transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="w-[200px] h-full mx-auto">
          <SidebarContent />
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default SideBar