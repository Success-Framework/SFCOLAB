"use client"

import WorldClock from "../sections/WorldClock"
import Calendar from "../sections/Calendar"
import Tasks from "../sections/Tasks"
import Header from "../sections/Header"
import { Plus } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="h-screen bg-black overflow-y-auto text-white p-4">
      <div className="mb-6">
        <Header
          // Search bar customization
          showSearch={true}
          searchPlaceholder="Search tasks, events..."
          searchClassName="w-[600px] "
          onSearch={(value) => {
            console.log('Search:', value);
          }}

          // Custom dropdown button texts
          dropdowns={{
            register: {
              label: 'Register',
              buttonText: 'Register Start Up',
              href: '/register-startup',  // This makes it a simple link button
              className: 'bg-[#1A1A1A] text-white ',
              icon: Plus,
              show: true
            }
          }}

          // Custom mobile menu button text
          mobileMenuButtonText="Dashboard Menu"

          // Custom search button text
          searchButtonText="Search Dashboard"

          // Event handlers
          onDropdownOptionClick={(key, option) => {
            console.log(`${key}: ${option.label} selected`);
          }}
          onMobileMenuOptionClick={(title, option) => {
            console.log(`${title}: ${option.label} selected`);
          }}
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        <div className="w-full h-screen overflow-y-auto lg:w-1/3">
          <WorldClock />
        </div>
        <div className="w-full h-screen overflow-y-auto lg:w-1/3">
          <Calendar />
        </div>
        <div className="w-full h-screen overflow-y-auto lg:w-1/3">
          <Tasks />
        </div>
      </div>
    </div>
  )
} 