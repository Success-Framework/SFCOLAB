import React, { useMemo } from 'react'
import { Users, Target, TrendingUp, Award, } from 'lucide-react'


const DashboardSection = ({ searchQuery = '' }) => {

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

  const filteredCards = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return dashboardCards
    return dashboardCards.filter(card => {
      const inTitle = card.title.toLowerCase().includes(q)
      const inValue = String(card.value).toLowerCase().includes(q)
      const inChange = String(card.change).toLowerCase().includes(q)
      const inMetrics = card.metrics?.some(m => (
        String(m.label).toLowerCase().includes(q) ||
        String(m.value).toLowerCase().includes(q)
      ))
      return inTitle || inValue || inChange || inMetrics
    })
  }, [searchQuery])

  return (
    <>


      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {filteredCards.map((card) => (
          <div key={card.id} className="bg-[#1A1A1A] rounded-4xl p-6 hover:bg-[#232323] transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {card.icon}
                <h3 className="text-lg font-semibold">{card.title}</h3>
              </div>
              <span className={`text-sm ${String(card.change).startsWith('+') ? 'text-green-500' : 'text-blue-500'
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
          </div>
        ))}
        {filteredCards.length === 0 && (
          <div className="text-sm text-gray-400 col-span-full">No dashboard metrics match your search</div>
        )}
      </div>

    </>
  )
}

export default DashboardSection