"use client"

import React, { useState } from 'react'
import WorldClock from "../sections/WorldClock"
import Calendar from "../sections/Calendar"
import Tasks from "../sections/Tasks"
import DashboardHeader from "../headers/DashboardHeader"
import DashboardSection from "../sections/DashboardSection"
import TaskProgress from "../sections/TaskProgress"

const Dashboard = () => {
  

  return (
    <div className="min-h-screen bg-black text-white">

    <DashboardHeader/>     


      {/* Main Content */}
      <div className="w-full mx-auto py-4 mb-4">
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <div className="w-full h-full overflow-y-auto lg:w-1/3">
            <WorldClock />
          </div>
          <div className="w-full h-full overflow-y-auto lg:w-1/3">
            <Calendar />
          </div>
          <div className="w-full h-full overflow-y-auto lg:w-1/3">
            {/* <Tasks /> */}
            <TaskProgress/>
          </div>
        </div>
      </div>
      <Tasks />   

      <DashboardSection/>
      
    </div>
  )
}

export default Dashboard 