import React, { useState } from 'react'
import { Search, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

const DashboardHeader = () => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      <div className='w-full min-h-[130px] p-4'>
        <div className='flex flex-col sm:flex-row w-full justify-between items-start sm:items-center gap-4 sm:gap-0 h-full'>
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
          </div>

          <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto'>
            {/* Search Bar */}
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full sm:w-[300px] px-4 py-2 pl-10 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 text-white placeholder-gray-400"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            {/* Register Startup Button */}
            <Link 
              to="/register-startup"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors w-full sm:w-auto"
            >
              <Plus className="h-4 w-4" />
              <span>Register Startup</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardHeader