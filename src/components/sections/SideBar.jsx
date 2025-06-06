import { BriefcaseBusiness, CalendarCog, File, FileChartColumnIncreasing, Flag, HelpCircle, House, Menu, Settings, SquareChartGantt, Users, X } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const SideBar = () => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  
  // general Links
  const allLinks = [
    {
      id: 1,
      icon: <House />,
      href: '/'
    },
    {
      id: 2,
      icon: <CalendarCog />,
      href: '/calendar'
    },
    {
      id: 3,
      icon: <FileChartColumnIncreasing />,
      href: '/analytics'
    },
    {
      id: 4,
      icon: <SquareChartGantt />,
      href: '/projects'
    },
    {
      id: 5,
      icon: <BriefcaseBusiness />,
      href: '/tasks'
    },
    {
      id: 6,
      icon: <File />,
      href: '/documents'
    }
  ]

  // myspaces links
  const myspaceLink = [
    {
      id: 1,
      icon: <Flag />,
      href: '/goals'
    },
    {
      id: 2,
      icon: <Users />,
      href: '/team'
    }
  ]

  const SidebarContent = () => (
    <div className='flex flex-col justify-between h-full w-full py-2.5 overflow-y-auto'>
      <div className='flex flex-col gap-4'>
        {/* general links */}
        <div className='flex flex-col gap-2 items-center'>
          <p className='text-sm text-gray-400'>General</p>
          {
            allLinks.map(link => (
              <Link 
                key={link.id} 
                to={link.href}
                className={`p-2 rounded-lg transition-all ${
                  location.pathname === link.href 
                    ? 'bg-white/10 backdrop-blur-sm' 
                    : 'hover:bg-white/5'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
              </Link>
            ))
          }
        </div>

        {/* myspace link */}
        <div className='flex flex-col gap-2 items-center'>
          <p className='text-sm text-gray-400'>Myspace</p>
          {
            myspaceLink.map((links) => (
              <Link 
                key={links.id}
                to={links.href}
                className={`p-2 rounded-lg transition-all ${
                  location.pathname === links.href 
                    ? 'bg-white/10 backdrop-blur-sm' 
                    : 'hover:bg-white/5'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {links.icon}
              </Link>
            ))
          }
        </div>
      </div>

      {/* support links */}
      <div className='flex flex-col gap-2 items-center'>
        <p className='text-sm text-gray-400'>Support</p>
        <Link 
          to="/settings"
          className={`p-2 rounded-lg transition-all ${
            location.pathname === '/settings' 
              ? 'bg-white/10 backdrop-blur-sm' 
              : 'hover:bg-white/5'
          }`}
          onClick={() => setIsOpen(false)}
        >
          <Settings size={20} />
        </Link>
        <Link 
          to="/help"
          className={`p-2 rounded-lg transition-all ${
            location.pathname === '/help' 
              ? 'bg-white/10 backdrop-blur-sm' 
              : 'hover:bg-white/5'
          }`}
          onClick={() => setIsOpen(false)}
        >
          <HelpCircle size={20} />
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
      <div className="hidden lg:block w-[107px] text-white bg-[#120C18] h-full">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <div className={`
        lg:hidden fixed inset-0 z-40 bg-[#120C18]/95 backdrop-blur-sm transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="w-[107px] h-full mx-auto">
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