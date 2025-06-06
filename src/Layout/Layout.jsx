import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/sections/NavBar'
import SideBar from '../components/sections/SideBar'
import Header from '../components/sections/Header'
const layout = () => {
    return (
        <>
            <div className="flex-1 h-screen mix-w-[1800px] w-screen overflow-hidden">


                <div className='w-full h-[10%] bg-[#000000]'>
                   
                    <NavBar />
                </div>


                <div className='bg-[#000000] relative h-screen max-w-screen overflow-auto flex '>
                    <div className='w-[107px] text-white bg-[#120C18] h-full flex justify-center py-2.5'>
                        <SideBar />
                    </div>
                    <div className='bg-[#000000] text-white flex flex-col w-full max-h-screen p-5 gap-10'>
                        <div className='h-[53px] w-full flex items-center'>
                            <Header/>
                        </div>
                        <div className='w-full h-[90%] pt-3.5 '>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default layout