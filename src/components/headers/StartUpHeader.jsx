import React, { useState } from 'react'
import { Search, Building2, MapPin, Filter } from 'lucide-react'

const StartUpHeader = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [openDropdown, setOpenDropdown] = useState(null)

  const industries = [
    'All Industries',
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Retail',
    'Manufacturing',
    'Real Estate',
    'Transportation',
    'Energy'
  ]

  const stages = [
    'All Stages',
    'Idea Stage',
    'MVP Stage',
    'Growth Stage',
    'Scale Stage',
    'Established'
  ]

  const locations = [
    'All Locations',
    'New York',
    'San Francisco',
    'London',
    'Berlin',
    'Tokyo',
    'Singapore',
    'Remote'
  ]

  const [selectedIndustry, setSelectedIndustry] = useState('All Industries')
  const [selectedStage, setSelectedStage] = useState('All Stages')
  const [selectedLocation, setSelectedLocation] = useState('All Locations')

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest('.dropdown-btn')) {
        setOpenDropdown(null)
      }
    }
    if (openDropdown) {
      document.addEventListener('mousedown', handleClick)
    }
    return () => document.removeEventListener('mousedown', handleClick)
  }, [openDropdown])

  const DropdownButton = ({ label, options, selected, onSelect, dropdownName, icon }) => (
    <div className="relative dropdown-btn">
      <button
        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
        onClick={() => setOpenDropdown(openDropdown === dropdownName ? null : dropdownName)}
        type="button"
      >
        {icon}
        <span>{selected}</span>
      </button>
      {openDropdown === dropdownName && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-[#1A1A1A] rounded-lg shadow-lg py-2 z-50">
          {options.map((option, index) => (
            <button
              key={index}
              className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/10"
              onClick={() => {
                onSelect(option)
                setOpenDropdown(null)
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="w-full flex justify-between items-end min-h-[130px] p-4">
      <div>
        <h1 className="text-2xl font-semibold">Startups</h1>
      </div>
      <div className="flex gap-4">
        <div className="relative">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search startups..."
              className="w-[300px] px-4 py-2 pl-10 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 text-white placeholder-gray-400"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
        <DropdownButton
          label="Industry"
          options={industries}
          selected={selectedIndustry}
          onSelect={setSelectedIndustry}
          dropdownName="industry"
          icon={<Building2 className="h-4 w-4" />}
        />
        <DropdownButton
          label="Stage"
          options={stages}
          selected={selectedStage}
          onSelect={setSelectedStage}
          dropdownName="stage"
          icon={<Filter className="h-4 w-4" />}
        />
        <DropdownButton
          label="Location"
          options={locations}
          selected={selectedLocation}
          onSelect={setSelectedLocation}
          dropdownName="location"
          icon={<MapPin className="h-4 w-4" />}
        />
      </div>
    </div>
  )
}

export default StartUpHeader