"use client"

import WorldClock from "../sections/WorldClock"
import Calendar from "../sections/Calendar"
import Tasks from "../sections/Tasks"

export default function Dashboard() {
  return (
    <div className="h-screen bg-black overflow-y-auto text-white p-4">
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
  )
} 