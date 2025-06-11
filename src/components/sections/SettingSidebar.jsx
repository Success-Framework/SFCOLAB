import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SettingSidebar = () => {
    const navigate = useNavigate()
    const [active, setActive] = useState(1)

    const handleLogout = () => {
        // Clear any stored authentication data
        localStorage.removeItem('token') // or whatever auth token you're using
        // You can add more cleanup here if needed
        
        // Redirect to login page
        navigate('/login')
    }

    const links = [
        {
            id: 1,
            name: 'Profile',
            href: '/setting/'
        },
        {
            id: 2,
            name: 'Account and Security',
            href: '/setting/account'
        },
        {
            id: 3,
            name: 'Preferences',
            href: '/setting/preferences'
        },
        {
            id: 4,
            name: 'Logout',
            isLogout: true
        }
    ]

    return (
        <>
            <div className='min-w-[250px] min-h-[200px] rounded-4xl p-2 space-y-8'>
                <div className='flex flex-col gap-2'
                
                >
                    {links.map((link) => (
                        link.isLogout ? (
                            <button
                                key={link.id}
                                onClick={handleLogout}
                                className={`text-lg text-[#C4C4C4] hover:text-white text-left ${active === link.id ? 'text-white' : ''}`}
                            >
                                {link.name}
                            </button>
                        ) : (
                            <Link 
                                key={link.id} 
                                to={link.href} 
                                onClick={() => setActive(link.id)}
                                className={`text-lg text-[#C4C4C4] hover:text-white ${active === link.id ? 'text-white' : ''}`}
                            >
                                {link.name}
                            </Link>
                        )
                    ))}
                </div>
            </div>
        </>
    )
}

export default SettingSidebar