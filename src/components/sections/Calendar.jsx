import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const navigateMonth = (direction) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setMonth(prevDate.getMonth() + (direction === 'next' ? 1 : -1))
      return newDate
    })
  }

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    
    // Get first day of the month
    const firstDay = new Date(year, month, 1)
    // Get last day of the month
    const lastDay = new Date(year, month + 1, 0)
    
    const days = []
    
    // Add days from previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    const firstDayOfWeek = firstDay.getDay()
    
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLastDay - i,
        isCurrentMonth: false,
        isToday: false,
        date: new Date(year, month - 1, prevMonthLastDay - i)
      })
    }
    
    // Add days of current month
    const today = new Date()
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i)
      days.push({
        day: i,
        isCurrentMonth: true,
        isToday: date.toDateString() === today.toDateString(),
        date: date
      })
    }
    
    // Add days from next month
    const remainingDays = 42 - days.length // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        isToday: false,
        date: new Date(year, month + 1, i)
      })
    }
    
    return days
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Calendar</h2>
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h3 className="text-lg font-medium">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <button 
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        
        {/* Week days header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-sm text-gray-400">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {generateCalendarDays().map((day, index) => (
            <div
              key={index}
              className={`
                h-8 w-8 flex items-center justify-center text-sm rounded cursor-pointer
                ${day.isCurrentMonth ? "text-white hover:bg-zinc-800" : "text-gray-600"}
                ${day.isToday ? "bg-green-600 text-white hover:bg-green-700" : ""}
              `}
            >
              {day.day}
            </div>
          ))}
        </div>
      </div>

      {/* Completed Tasks Progress */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
        <h3 className="text-sm font-medium mb-4">Completed Tasks</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Total Tasks Completed</span>
              <span>92 of 100</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: "92%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Tasks On-time</span>
              <span>83 of 100</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-2">
              <div className="bg-orange-600 h-2 rounded-full" style={{ width: "83%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Tasks Late</span>
              <span>18 of 100</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-2">
              <div className="bg-red-600 h-2 rounded-full" style={{ width: "18%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 