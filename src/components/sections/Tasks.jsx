import React from 'react'

export default function Tasks() {
  const tasks = [
    {
      id: 1,
      title: "User Research",
      description: "Conduct a user research by conducting online survey and draft out questionnaires.",
      status: "In Progress",
      date: "Monday",
      avatars: [
        "/placeholder.svg?height=24&width=24",
        "/placeholder.svg?height=24&width=24",
        "/placeholder.svg?height=24&width=24",
      ],
    },
    {
      id: 2,
      title: "Design System",
      description: "Conduct a user research by conducting online survey and draft out questionnaires.",
      status: "In Progress",
      date: "Monday",
      avatars: [
        "/placeholder.svg?height=24&width=24",
        "/placeholder.svg?height=24&width=24",
        "/placeholder.svg?height=24&width=24",
      ],
    },
    {
      id: 3,
      title: "Real Estate Landing Page",
      description:
        "Assist to leverage on our efforts in making the user research possible and ensure the design solution for the real estate project.",
      status: "Completed",
      date: "31/04/22",
      avatars: [
        "/placeholder.svg?height=24&width=24",
        "/placeholder.svg?height=24&width=24",
        "/placeholder.svg?height=24&width=24",
      ],
    },
  ]

  const inProgressTasks = [
    {
      id: 4,
      title: "UI/UX Design",
      description: "Create wireframes and mockups for the new dashboard interface",
      status: "In Progress",
      date: "Tuesday",
      avatars: [
        "/placeholder.svg?height=24&width=24",
        "/placeholder.svg?height=24&width=24",
      ],
    },
    {
      id: 5,
      title: "Frontend Development",
      description: "Implement responsive design components using React",
      status: "In Progress",
      date: "Wednesday",
      avatars: [
        "/placeholder.svg?height=24&width=24",
        "/placeholder.svg?height=24&width=24",
        "/placeholder.svg?height=24&width=24",
      ],
    }
  ]

  const completedTasks = [
    {
      id: 6,
      title: "Project Setup",
      description: "Initialize project repository and set up development environment",
      status: "Completed",
      date: "15/04/22",
      avatars: [
        "/placeholder.svg?height=24&width=24",
        "/placeholder.svg?height=24&width=24",
      ],
    },
    {
      id: 7,
      title: "API Integration",
      description: "Connect frontend with backend APIs and implement error handling",
      status: "Completed",
      date: "20/04/22",
      avatars: [
        "/placeholder.svg?height=24&width=24",
        "/placeholder.svg?height=24&width=24",
        "/placeholder.svg?height=24&width=24",
      ],
    }
  ]

  const TaskCard = ({ task }) => (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 w-[300px] min-h-[280px] flex-shrink-0">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              task.status === "Completed" ? "bg-green-500" : "bg-orange-500"
            }`}
          />
          <span className="font-medium">{task.title}</span>
        </div>
        <button className="p-1 hover:bg-zinc-800 rounded">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>

      <p className="text-sm text-gray-400 mb-3">{task.description}</p>

      <div className="flex justify-between items-center">
        <div className="flex -space-x-2">
          {task.avatars.map((avatar, index) => (
            <div key={index} className="h-6 w-6 rounded-full border-2 border-zinc-900 overflow-hidden">
              <img src={avatar || "/placeholder.svg"} alt="Avatar" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
        <span className="text-xs text-gray-500">{task.date}</span>
      </div>

      <div className="mt-3">
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            task.status === "Completed"
              ? "bg-green-600 text-white"
              : "bg-orange-600 text-white"
          }`}
        >
          {task.status}
        </span>
      </div>
    </div>
  )

  const TaskSection = ({ title, tasks, badgeCount }) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className="bg-zinc-700 text-white px-2 py-1 rounded-full text-sm">{badgeCount}</span>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-min">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Task
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-6">
        <TaskSection 
          title="Today's Tasks" 
          tasks={tasks} 
          badgeCount={tasks.length}
        />

        <TaskSection 
          title="In Progress" 
          tasks={inProgressTasks} 
          badgeCount={inProgressTasks.length}
        />

        <TaskSection 
          title="Completed" 
          tasks={completedTasks} 
          badgeCount={completedTasks.length}
        />
      </div>
    </div>
  )
} 