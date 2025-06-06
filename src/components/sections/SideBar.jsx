import { BriefcaseBusiness, CalendarCog, File, FileChartColumnIncreasing, Flag, House, icons, SquareChartGantt, Users } from 'lucide-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const SideBar = () => {
  const location = useLocation()
  

  // genral Links
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

  const myspaceLink =[
    {
      id:1,
      icon:<Flag />,
      href:'/goals',
    },
    {
      id:2,
      icon:<Users />,
      href:'/team'
    }
  ]


  return (
    <>
    <div className='flex-col flex justify-center gap-5 '>

      {/* general links */}
      <div className='flex-1 flex flex-col gap-3 items-center'>

        <p className='text-sm text-gray-400'>General</p>
        {
          allLinks.map(link =>(
            <Link 
              key={link.id} 
              to={link.href}
              className={`p-2 rounded-lg transition-all flex items-center gap-2 ${
                location.pathname === link.href 
                  ? 'bg-white/10 backdrop-blur-sm' 
                  : 'hover:bg-white/5'
              }`}
            >
              {link.icon}
            </Link>
          ))
        }
      </div>

      {/* myspace link */}
      <div className='flex-1 flex flex-col gap-3 items-center'>
        <p className='text-sm text-gray-400'>Myspace</p>
        {
          myspaceLink.map((links) => (
            <Link 
              key={links.id}
              to={links.href}
              className={`p-2 rounded-lg transition-all flex items-center gap-2 ${
                location.pathname === links.href 
                  ? 'bg-white/10 backdrop-blur-sm' 
                  : 'hover:bg-white/5'
              }`}
            >
              {links.icon}
            </Link>
          ))
        }
      </div>

    </div>
    </>
  )
}

export default SideBar