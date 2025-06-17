import React from 'react'
import SettingSidebar from '../sections/SettingSidebar'
import { Outlet } from 'react-router-dom'

const setting = () => {
  return (
    <>
    <div className='w-full h-full space-y-5'>
          {/* header */}
          <div className=''>
          <h1 className=' text-3xl font-medium'>Settings</h1>
      </div>
      <div className='w-full flex justify-between gap-10 min-h-screen'>
      
        <div className='w-[20%] h-full bg-[#1A1A1A] rounded-4xl p-7 space-y-10'>
          <SettingSidebar/>
        </div>
        <div className='w-[80%] min-h-screen rounded-4xl p-7 space-y-10'>
          <Outlet/>
        </div>
      </div>
    </div>
    </>
  )
}

export default setting