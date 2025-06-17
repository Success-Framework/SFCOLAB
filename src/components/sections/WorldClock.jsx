import React, { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

const TIME_ZONES = [
  { city: "New York", offset: -4, utc: "UTC-4" },
  { city: "London", offset: 1, utc: "UTC+1" },
  { city: "Tokyo", offset: 9, utc: "UTC+9" },
  { city: "Sydney", offset: 10, utc: "UTC+10" },
]

export default function WorldClock() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const getTimeForTimezone = (offset) => {
    const utc = currentTime.getTime() + (currentTime.getTimezoneOffset() * 60000)
    return new Date(utc + (3600000 * offset))
  }

  const formatTime = (date) => {
    const time = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
    const [timePart, period] = time.split(' ')
    return { timePart, period }
  }

  return (
    <div className="h-full">
      <h2 className="text-xl font-semibold mb-4">World Clock</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2">
        {TIME_ZONES.map(({ city, offset, utc }) => {
          const time = getTimeForTimezone(offset)
          const isDay = time.getHours() >= 6 && time.getHours() < 18
          const { timePart, period } = formatTime(time)

          return (
            <div key={city} className="bg-zinc-800 min-h-[180px] min-w-[190px] rounded-lg">
              <div className='flex flex-col justify-between h-full w-full p-4'>
                <div className="flex items-center w-full justify-between">
                  <span className="font-medium">{city}</span>
                  <div className="text-sm text-gray-400">{utc}</div>
                </div>
                <div className='space-y-3'>
                  <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-400">{isDay ? 'Day' : 'Night'}</p>
                    {isDay ? (
                      <Sun className="h-4 w-4 text-yellow-500" />
                    ) : (
                      <Moon className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                  <div className="flex items-baseline gap-2 ">
                    <span className="text-4xl font-bold">{timePart}</span>
                    <span className="text-xl font-bold">{period}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
} 