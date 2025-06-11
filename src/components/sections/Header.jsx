import { BriefcaseBusiness, List, Menu, Search } from 'lucide-react'
import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'

// Search Bar Component
const SearchBar = ({ className = "", onSearch, placeholder = "Search...", searchClassName = "" }) => {
  return (
    <div className={`relative h-full flex items-center ${className}`}>
      <input 
        type="text" 
        placeholder={placeholder}
        onChange={(e) => onSearch?.(e.target.value)}
        className={`rounded-lg h-full bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 pl-10 pr-4 transition-all duration-200 ${searchClassName}`}
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
    </div>
  )
}

// Dropdown Component
const Dropdown = ({ 
  label, 
  icon: Icon, 
  options, 
  isActive, 
  onClick, 
  className = "",
  showLabel = true,
  onOptionClick,
  buttonText = "Select",
  href = null,
  buttonSize = "default"
}) => {
  // Size classes mapping
  const sizeClasses = {
    small: "h-[32px] px-3 text-xs",
    default: "h-[40px] px-4 text-sm",
    large: "h-[48px] px-5 text-base"
  }

  const buttonClasses = `flex items-center gap-2 rounded-lg transition-all duration-200 ${sizeClasses[buttonSize]} ${className}`

  // If href is provided, render as a simple link button
  if (href) {
    return (
      <Link 
        to={href}
        className={buttonClasses}
      >
        {Icon && <Icon size={buttonSize === "small" ? 16 : buttonSize === "large" ? 24 : 20} />}
        {showLabel && <span className="hidden lg:inline">{buttonText}</span>}
      </Link>
    )
  }

  // Otherwise render as dropdown
  return (
    <div className="relative">
      <button 
        onClick={onClick}
        className={buttonClasses}
      >
        {Icon && <Icon size={buttonSize === "small" ? 16 : buttonSize === "large" ? 24 : 20} />}
        {showLabel && <span className="hidden lg:inline">{buttonText}</span>}
      </button>
      {isActive && options && options.length > 0 && (
        <div className="absolute right-0 mt-2 w-48 bg-[#120C18] rounded-lg shadow-lg py-2 z-50">
          {options.map((option, index) => (
            option.href ? (
              <Link
                key={index}
                to={option.href}
                className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10"
                onClick={() => onOptionClick?.(option)}
              >
                {option.label}
              </Link>
            ) : (
              <button 
                key={index}
                onClick={() => onOptionClick?.(option)}
                className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10"
              >
                {option.label || option}
              </button>
            )
          ))}
        </div>
      )}
    </div>
  )
}

// Mobile Menu Component
const MobileMenu = ({ isOpen, onClose, menuItems, onOptionClick }) => {
  return (
    <>
      {isOpen && (
        <div className="md:hidden fixed top-[10%] right-0 w-64 bg-[#120C18] rounded-lg shadow-lg py-2 z-50">
          {/* Search in mobile menu */}
          <div className="px-4 py-2">
            <SearchBar />
          </div>

          {/* Menu Items */}
          {Object.entries(menuItems).map(([title, options]) => (
            <div key={title} className="px-4 py-2">
              {options.map((option, index) => (
                option.href ? (
                  <Link
                    key={index}
                    to={option.href}
                    className="w-full text-left text-sm text-white hover:bg-white/10 rounded-lg px-4 py-2"
                    onClick={() => onOptionClick?.(title, option)}
                  >
                    {option.label}
                  </Link>
                ) : (
                  <button 
                    key={index}
                    onClick={() => onOptionClick?.(title, option)}
                    className="w-full text-left text-sm text-white hover:bg-white/10 rounded-lg px-4 py-2"
                  >
                    {option.label || option}
                  </button>
                )
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}
    </>
  )
}

const Header = ({
  // Page title customization
  customTitle,
  
  // Search bar customization
  showSearch = true,
  searchPlaceholder = "Search...",
  searchClassName = "",
  searchContainerClassName = "",
  onSearch,
  
  // Dropdown customization
  dropdowns = {
    available: {
      label: 'Available',
      buttonText: 'Status',
      options: [
        { label: 'Available', href: '/status/available' },
        { label: 'Busy', href: '/status/busy' },
        { label: 'Away', href: '/status/away' },
        { label: 'Offline', href: '/status/offline' }
      ],
      className: 'bg-white/10 text-white hover:bg-white/20',
      icon: null,
      show: true,
      buttonSize: 'default'
    },
    userType: {
      label: 'User Type',
      buttonText: 'Role',
      options: [
        { label: 'Admin', href: '/roles/admin' },
        { label: 'Manager', href: '/roles/manager' },
        { label: 'Employee', href: '/roles/employee' },
        { label: 'Guest', href: '/roles/guest' }
      ],
      className: 'bg-white/10 text-white hover:bg-white/20',
      icon: List,
      show: true
    },
    position: {
      label: 'Position',
      buttonText: 'Job',
      options: [
        { label: 'Developer', href: '/positions/developer' },
        { label: 'Designer', href: '/positions/designer' },
        { label: 'Product Manager', href: '/positions/product-manager' },
        { label: 'Marketing', href: '/positions/marketing' }
      ],
      className: 'bg-white text-gray-600 hover:bg-white/70',
      icon: BriefcaseBusiness,
      show: true
    }
  },
  
  // Mobile menu customization
  mobileMenuItems = {
    'Available Status': [
      { label: 'Available', href: '/status/available' },
      { label: 'Busy', href: '/status/busy' },
      { label: 'Away', href: '/status/away' },
      { label: 'Offline', href: '/status/offline' }
    ],
    'User Type': [
      { label: 'Admin', href: '/roles/admin' },
      { label: 'Manager', href: '/roles/manager' },
      { label: 'Employee', href: '/roles/employee' },
      { label: 'Guest', href: '/roles/guest' }
    ],
    'Position': [
      { label: 'Developer', href: '/positions/developer' },
      { label: 'Designer', href: '/positions/designer' },
      { label: 'Product Manager', href: '/positions/product-manager' },
      { label: 'Marketing', href: '/positions/marketing' }
    ]
  },
  
  // Event handlers
  onDropdownOptionClick,
  onMobileMenuOptionClick,

  // Button customization
  mobileMenuButtonText = "Menu",
  searchButtonText = "Search",
}) => {
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const handleDropdownClick = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName)
  }

  // Function to get page title based on current path
  const getPageTitle = () => {
    if (customTitle) return customTitle
    
    const path = location.pathname
    if (path === '/') return 'Home'
    if (path === '/dashboard') return 'DashBoard'
    if (path === '/ideation') return 'ideation'
    if (path === '/knowledge') return 'knowledge'
    if (path === '/projects') return 'Find Collaborators'
    if (path === '/register-startup') return 'register-startup'
    return 'Home'
  }

  return (
    <div className='h-[100px] w-full flex items-center justify-between '>
      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label={mobileMenuButtonText}
      >
        <Menu size={20} />
        <span className="sr-only">{mobileMenuButtonText}</span>
      </button>

      {/* Page Title */}
      <div className='text-2xl lg:text-[40px] font-[500] text-white'>
        <h1>{getPageTitle()}</h1>
      </div>

      {/* Search bar */}
      {showSearch && (
        <div className={`hidden md:flex w-[50%] h-[40px] items-center gap-4 mx-4 ${searchContainerClassName}`}>
          <SearchBar 
            placeholder={searchPlaceholder}
            onSearch={onSearch}
            searchClassName={searchClassName}
            className="w-full"
          />
        </div>
      )}

      {/* Desktop Actions */}
      <div className='hidden md:flex gap-3 items-center'>
        {Object.entries(dropdowns).map(([key, config]) => (
          config.show && (
            <Dropdown
              key={key}
              label={config.label}
              buttonText={config.buttonText}
              icon={config.icon}
              options={config.options}
              isActive={activeDropdown === key}
              onClick={() => handleDropdownClick(key)}
              className={config.className}
              onOptionClick={(option) => onDropdownOptionClick?.(key, option)}
              href={config.href}
              buttonSize={config.buttonSize}
            />
          )
        ))}
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        menuItems={mobileMenuItems}
        onOptionClick={onMobileMenuOptionClick}
      />
    </div>
  )
}

export default Header