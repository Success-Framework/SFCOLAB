import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/sections/NavBar'
import SideBar from '../components/sections/SideBar'

const Layout = () => {
    return (
        <div className="h-screen w-screen overflow-hidden bg-[#000000]">
            <div className='w-full h-[10%]'>
                <NavBar />
            </div>

            <div className='relative h-[90%] w-full overflow-hidden flex'>
                <SideBar />
                
                <div className='text-white flex flex-col w-full overflow-hidden p-5 gap-10'>
                   
                    <div className='w-full h-[100%] pt-3.5 overflow-y-auto'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout