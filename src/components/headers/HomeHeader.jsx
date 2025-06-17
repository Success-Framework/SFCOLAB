import React, { useState } from 'react'
import { ChevronDown, MapPin, Filter, Building2, Search } from 'lucide-react'

const FilterHeader = () => {
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const locations = [
    "New York",
    "San Francisco",
    "London",
    "Berlin",
    "Tokyo",
    "Singapore"
  ]

  const stages = [
    "Idea Stage",
    "MVP Stage",
    "Growth Stage",
    "Scale Stage"
  ]

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Retail",
    "Manufacturing"
  ]

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName)
  }

  const FilterButton = ({ icon, label, dropdownName, options }) => (
    <div className="relative">
      <button
        onClick={() => toggleDropdown(dropdownName)}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
      >
        {icon}
        <span>{label}</span>
        <ChevronDown className="h-4 w-4" />
      </button>
      
      {activeDropdown === dropdownName && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-[#1A1A1A] rounded-lg shadow-lg py-2 z-50">
          {options.map((option, index) => (
            <button
              key={index}
              className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/10"
              onClick={() => {
                // Handle option selection
                setActiveDropdown(null)
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )

  const SearchBar = () => (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search projects..."
          className="w-[300px] px-4 py-2 pl-10 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 text-white placeholder-gray-400"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
      {searchQuery && (
        <div className="absolute top-full left-0 mt-2 w-full bg-[#1A1A1A] rounded-lg shadow-lg py-2 z-50">
          {/* Add search results here */}
          <div className="px-4 py-2 text-sm text-gray-400">
            No results found
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="w-full flex justify-end items-end min-h-[130px] p-4">
      <div className="flex gap-4">
        <SearchBar />
        <FilterButton
          icon={<MapPin className="h-4 w-4" />}
          label="Location"
          dropdownName="location"
          options={locations}
        />
        <FilterButton
          icon={<Filter className="h-4 w-4" />}
          label="Filter by stages"
          dropdownName="stages"
          options={stages}
        />
        <FilterButton
          icon={<Building2 className="h-4 w-4" />}
          label="Select industry"
          dropdownName="industry"
          options={industries}
        />
      </div>
    </div>
  )
}

export default FilterHeader 