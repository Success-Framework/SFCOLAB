import { BriefcaseBusiness, CalendarCog, File, FileChartColumnIncreasing, Flag, HelpCircle, House, Menu, Settings, SquareChartGantt, User, UserPlus, Users, X } from 'lucide-react'
import React, { useState } from 'react'
import { href, Link, useLocation } from 'react-router-dom'

const SideBar = () => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  // general Links
  const allLinks = [
    {
      id: 1,
      icon: <House />,
      href: '/',
      name: 'Home'
    },
    {
      id: 2,
      icon: <CalendarCog />,
      href: '/dashboard',
      name: 'Dashboard'
    },
    {
      id: 3,
      icon: <FileChartColumnIncreasing />,
      href: '/ideation',
      name: 'Ideation'
    },
    
    {
      id: 4,
      icon: <BriefcaseBusiness />,
      href: '/knowledge',
      name: 'Knowledge Base'
    },
    {
      id: 5,
      icon: <SquareChartGantt />,
      href: '/projects',
      name: 'Find Collaborators'
    },
    {
      id: 6,
      icon: <File />,
      href: '/register-startup',
      name: 'Register StarUp'
    },
    {
      id: 7,
      icon:<User/>,
      href:'/startup',
      name:'Join Startup'
    }
  ]


  const SidebarContent = () => (
    <div 
      className='flex flex-col justify-between h-full w-full py-2.5 overflow-y-auto'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='flex flex-col gap-4'>
        {/* general links */}
        <div className='flex flex-col gap-2 items-center'>
          {
            allLinks.map(link => (
              <Link 
                key={link.id} 
                to={link.href}
                className={`p-2 rounded-lg transition-all flex items-center ${
                  location.pathname === link.href 
                    ? 'bg-white/10 backdrop-blur-sm' 
                    : 'hover:bg-white/5'
                } ${isHovered ? 'w-full px-4' : 'w-fit'}`}
                onClick={() => setIsOpen(false)}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  {link.icon}
                </div>
                {isHovered && (
                  <span className="text-sm whitespace-nowrap ml-3">{link.name}</span>
                )}
              </Link>
            ))
          }
        </div>

      </div>

      {/* support links */}
      <div className='flex flex-col gap-2 items-center'>
        <Link 
          to="/setting"
          className={`p-2 rounded-lg transition-all flex items-center ${
            location.pathname === '/setting' 
              ? 'bg-white/10 backdrop-blur-sm' 
              : 'hover:bg-white/5'
          } ${isHovered ? 'w-full px-4' : 'w-fit'}`}
          onClick={() => setIsOpen(false)}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <Settings size={20} />
          </div>
          {isHovered && (
            <span className="text-sm whitespace-nowrap ml-3">Settings</span>
          )}
        </Link>
        <Link 
          to="/help"
          className={`p-2 rounded-lg transition-all flex items-center ${
            location.pathname === '/help' 
              ? 'bg-white/10 backdrop-blur-sm' 
              : 'hover:bg-white/5'
          } ${isHovered ? 'w-full px-4' : 'w-fit'}`}
          onClick={() => setIsOpen(false)}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <HelpCircle size={20} />
          </div>
          {isHovered && (
            <span className="text-sm whitespace-nowrap ml-3">Help</span>
          )}
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
      <div className={`hidden lg:block ${isHovered ? 'w-[200px]' : 'w-[100px]'} m-4 pt-4 rounded-t-3xl text-white bg-[#1A1A1A] h-full transition-all duration-300`}>
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <div className={`
        lg:hidden fixed inset-0 z-40 bg-[#1A1A1A] backdrop-blur-sm transition-transform duration-300 ease-in-out
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