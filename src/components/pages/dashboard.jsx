"use client"

import React, { useState } from 'react'
import WorldClock from "../sections/WorldClock"
import Calendar from "../sections/Calendar"
import Tasks from "../sections/Tasks"
import DashboardHeader from "../headers/DashboardHeader"
import DashboardSection from '../sections/dashboardSection'

const Dashboard = () => {
  

  return (
    <div className="min-h-screen bg-black text-white">

    <DashboardHeader/>     


      {/* Main Content */}
      <div className="w-full mx-auto py-8">
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <div className="w-full h-screen overflow-y-auto lg:w-1/3">
            <WorldClock />
          </div>
          <div className="w-full h-screen overflow-y-auto lg:w-1/3">
            <Calendar />
          </div>
          <div className="w-full h-screen overflow-y-auto lg:w-1/3">
            <Tasks />
          </div>
        </div>   
      </div>
      
      <DashboardSection/>
      
    </div>
  )
}

export default Dashboard 