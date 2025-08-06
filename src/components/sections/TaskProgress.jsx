import React from 'react'

const PROGRESS_ITEMS = [
  {
    id: 1,
    title: "Total Tasks Completed",
    current: 92,
    total: 100,
    color: "bg-green-600"
  },
  {
    id: 2,
    title: "Tasks On-time",
    current: 83,
    total: 100,
    color: "bg-orange-600"
  },
  {
    id: 3,
    title: "Tasks Late",
    current: 18,
    total: 100,
    color: "bg-red-600"
  }
]

export default function TaskProgress() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Task Progress</h2>
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
        <h3 className="text-sm font-medium mb-4">Completed Tasks</h3>
        <div className="space-y-3">
          {PROGRESS_ITEMS.map((item) => (
            <div key={item.id}>
              <div className="flex justify-between text-sm sm:text-base mb-1">
                <span>{item.title}</span>
                <span>{item.current} of {item.total}</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-[6px] sm:h-2">
                <div 
                  className={`${item.color} h-[6px] sm:h-2 rounded-full`} 
                  style={{ width: `${(item.current / item.total) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 