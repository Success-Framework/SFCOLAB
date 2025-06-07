"use client"

import WorldClock from "./WorldClock"
import Calendar from "./Calendar"
import Tasks from "./Tasks"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        <div className="w-full lg:w-1/3">
          <WorldClock />
        </div>
        <div className="w-full lg:w-1/3">
          <Calendar />
        </div>
        <div className="w-full lg:w-1/3">
          <Tasks />
        </div>
      </div>
    </div>
  )
} 