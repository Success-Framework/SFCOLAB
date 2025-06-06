import { BellDot, SquareMenu } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { allimg } from '../../utils'

const NavBar = () => {
    const [activeDropdown, setActiveDropdown] = useState(null)

    const handleDropdownClick = (dropdownName) => {
        setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName)
    }

    return (
        <nav className='flex px-5 items-center w-full h-full justify-between relative'>
            {/* logo */}
            <div className='logo'>
                <Link className='text-white text-xl font-bold'>
                    SFCOLAB
                </Link>
            </div>

            {/* main content */}
            <div className='content items-center h-full flex gap-4'>
                {/* messages dropdown */}
                <div className='relative'>
                    <button 
                        onClick={() => handleDropdownClick('menu')}
                        className='text-xl font-medium text-[#C4C4C4]'
                    >
                        <SquareMenu />
                    </button>
                    {activeDropdown === 'menu' && (
                        <div className='absolute right-0 mt-2 w-48 bg-[#120C18] rounded-lg shadow-lg py-2 z-50'>
                            <Link to="/messages" className='block px-4 py-2 text-white hover:bg-white/10'>Messages</Link>
                            <Link to="/settings" className='block px-4 py-2 text-white hover:bg-white/10'>Settings</Link>
                        </div>
                    )}
                </div>

                {/* notification dropdown */}
                <div className='relative'>
                    <button 
                        onClick={() => handleDropdownClick('notification')}
                        className='text-xl font-medium text-[#C4C4C4]'
                    >
                        <BellDot />
                    </button>
                    {activeDropdown === 'notification' && (
                        <div className='absolute right-0 mt-2 w-48 bg-[#120C18] rounded-lg shadow-lg py-2 z-50'>
                            <div className='px-4 py-2 text-white'>No new notifications</div>
                        </div>
                    )}
                </div>

                {/* profile dropdown */}
                <div className='relative'>
                    <button 
                        onClick={() => handleDropdownClick('profile')}
                        className='w-10 h-10 rounded-full overflow-hidden'
                    >
                        <img src={allimg.profileImg} alt="Profile" className='w-full h-full object-cover' />
                    </button>
                    {activeDropdown === 'profile' && (
                        <div className='absolute right-0 mt-2 w-48 bg-[#120C18] rounded-lg shadow-lg py-2 z-50'>
                            <Link to="/profile" className='block px-4 py-2 text-white hover:bg-white/10'>Profile</Link>
                            <Link to="/settings" className='block px-4 py-2 text-white hover:bg-white/10'>Settings</Link>
                            <Link to="/logout" className='block px-4 py-2 text-white hover:bg-white/10'>Logout</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default NavBar