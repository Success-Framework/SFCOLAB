import React, { useState } from 'react'
import { Filter, ChevronDown, Search, Bell, Settings, Menu, X, Users, Target, TrendingUp, Award, Clock, ArrowUpRight, Check, Trash2 } from 'lucide-react'


const DashboardSection = () => {
    const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [selectedStage, setSelectedStage] = useState('All Stages')
  const [showNotifications, setShowNotifications] = useState(false)

  const stages = [
    'All Stages',
    'Idea Stage',
    'MVP Stage',
    'Growth Stage',
    'Scale Stage',
    'Research Stage'
  ]

  const notifications = [
    {
      id: 1,
      title: 'New Project Update',
      message: 'Project "AI Integration" has been updated',
      time: '5 minutes ago',
      read: false,
      type: 'project'
    },
    {
      id: 2,
      title: 'Team Meeting',
      message: 'Scheduled for tomorrow at 10:00 AM',
      time: '1 hour ago',
      read: false,
      type: 'meeting'
    },
    {
      id: 3,
      title: 'Task Completed',
      message: 'John completed the UI design task',
      time: '2 hours ago',
      read: true,
      type: 'task'
    },
    {
      id: 4,
      title: 'New Comment',
      message: 'Sarah commented on your project',
      time: '3 hours ago',
      read: true,
      type: 'comment'
    }
  ]

  const dashboardCards = [
    {
      id: 1,
      title: 'Team Performance',
      value: '92%',
      change: '+5%',
      icon: <Users className="h-6 w-6 text-blue-500" />,
      metrics: [
        { label: 'Active Members', value: '12' },
        { label: 'Tasks Completed', value: '45' },
        { label: 'Productivity', value: 'High' }
      ]
    },
    {
      id: 2,
      title: 'Project Goals',
      value: '78%',
      change: '+12%',
      icon: <Target className="h-6 w-6 text-green-500" />,
      metrics: [
        { label: 'Milestones', value: '8/10' },
        { label: 'On Track', value: 'Yes' },
        { label: 'Next Goal', value: 'MVP Launch' }
      ]
    },
    {
      id: 3,
      title: 'Growth Metrics',
      value: '156%',
      change: '+23%',
      icon: <TrendingUp className="h-6 w-6 text-yellow-500" />,
      metrics: [
        { label: 'User Growth', value: '+45%' },
        { label: 'Revenue', value: '$45K' },
        { label: 'Market Share', value: '12%' }
      ]
    },
    {
      id: 4,
      title: 'Achievements',
      value: '15',
      change: 'New',
      icon: <Award className="h-6 w-6 text-purple-500" />,
      metrics: [
        { label: 'This Month', value: '3' },
        { label: 'Total', value: '15' },
        { label: 'Next Target', value: '20' }
      ]
    }
  ]
  return (
    <>


         {/* Dashboard Cards */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {dashboardCards.map((card) => (
            <div key={card.id} className="bg-[#1A1A1A] rounded-4xl p-6 hover:bg-[#232323] transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {card.icon}
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                </div>
                <span className={`text-sm ${
                  card.change.startsWith('+') ? 'text-green-500' : 'text-blue-500'
                }`}>
                  {card.change}
                </span>
              </div>

              <div className="mb-4">
                <p className="text-3xl font-bold">{card.value}</p>
              </div>

              <div className="space-y-3">
                {card.metrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{metric.label}</span>
                    <span className="font-medium">{metric.value}</span>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 flex items-center justify-center gap-2 text-blue-500 text-sm hover:text-blue-400 transition-colors">
                View Details
                <ArrowUpRight size={14} />
              </button>
            </div>
          ))}
        </div>

</>
  )
}

export default DashboardSection