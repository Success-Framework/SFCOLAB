import React, { useState } from 'react'
import { Search, ChevronDown, BriefcaseBusiness } from 'lucide-react'

const FindContributionHeader = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [openDropdown, setOpenDropdown] = useState(null)

  const userTypes = [
    'All User Types',
    'Developer',
    'Designer',
    'Product Manager',
    'Marketing',
    'Sales',
    'Business Analyst',
    'Project Manager'
  ]

  const availabilityOptions = [
    'All Availability',
    'Available Now',
    'Available in 1 Week',
    'Available in 2 Weeks',
    'Available in 1 Month',
    'Part-time',
    'Full-time'
  ]

  const [selectedUserType, setSelectedUserType] = useState('All User Types')
  const [selectedAvailability, setSelectedAvailability] = useState('All Availability')

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

  const DropdownButton = ({ label, options, selected, onSelect, dropdownName }) => (
    <div className="relative dropdown-btn">
      <button
        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
        onClick={() => setOpenDropdown(openDropdown === dropdownName ? null : dropdownName)}
        type="button"
      >
        {selected}
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
        <h1 className="text-2xl font-semibold">Find Contribution</h1>
      </div>
      <div className="flex gap-4">
        <div className="relative">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search contributors..."
              className="w-[300px] px-4 py-2 pl-10 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 text-white placeholder-gray-400"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
        <DropdownButton
          label="User Type"
          options={userTypes}
          selected={selectedUserType}
          onSelect={setSelectedUserType}
          dropdownName="userType"
        />
        <DropdownButton
          label="Availability"
          options={availabilityOptions}
          selected={selectedAvailability}
          onSelect={setSelectedAvailability}
          dropdownName="availability"
        />
        <button
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
        >
          <BriefcaseBusiness className="h-4 w-4" />
          <span>Position</span>
        </button>
      </div>
    </div>
  )
}

export default FindContributionHeader