import React from 'react'
import StartUpHeader from '../headers/StartUpHeader'
import { Link } from 'react-router-dom'
import { Users, Building2, MapPin, Calendar } from 'lucide-react'

const StartUp = () => {
  const getRandomColor = () => {
    const colors = ['bg-red-700', 'bg-yellow-600', 'bg-gray-600', 'bg-green-600']
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const startupContent = [
    {
      id: 1,
      name: 'TechVision AI',
      description: 'Revolutionary AI platform for predictive analytics in healthcare. Using machine learning to improve patient outcomes and reduce healthcare costs.',
      industry: 'Healthcare',
      stage: 'Growth Stage',
      location: 'San Francisco',
      teamSize: '25',
      founded: '2022',
      funding: '$5M'
    },
    {
      id: 2,
      name: 'GreenEnergy Solutions',
      description: 'Innovative renewable energy solutions for residential and commercial properties. Making sustainable energy accessible and affordable.',
      industry: 'Energy',
      stage: 'MVP Stage',
      location: 'Berlin',
      teamSize: '15',
      founded: '2023',
      funding: '$2M'
    },
    {
      id: 3,
      name: 'EduTech Pro',
      description: 'Next-generation learning platform using AI to personalize education. Helping students achieve better results through adaptive learning.',
      industry: 'Education',
      stage: 'Scale Stage',
      location: 'London',
      teamSize: '40',
      founded: '2021',
      funding: '$8M'
    },
    {
      id: 4,
      name: 'FinTech Innovators',
      description: 'Disrupting traditional banking with blockchain technology. Making financial services more accessible and secure for everyone.',
      industry: 'Finance',
      stage: 'Growth Stage',
      location: 'Singapore',
      teamSize: '30',
      founded: '2022',
      funding: '$6M'
    }
  ]

  return (
    <div className='h-screen overflow-y-auto overflow-hidden'>
      <StartUpHeader />
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-4'>
        {startupContent.map(startup => (
          <Link key={startup.id} to={`/startup/${startup.id}`} className='bg-[#232323] rounded-4xl h-full'>
            <div className='w-full h-full p-2'>
              <div className='bg-[#1A1A1A] flex-1 items-center justify-center min-h-[330px] rounded-4xl p-7 space-y-10'>
                {/* header */}
                <div className='flex w-full justify-between'>
                  <h1 className='text-lg font-bold'>{startup.name}</h1>
                  <button className={`${getRandomColor()} text-sm px-1 font-medium rounded-sm`}>
                    {startup.stage}
                  </button>
                </div>

                {/* content */}
                <div className='text-sm font-medium leading-tight text-[#C4C4C4]'>
                  {startup.description}
                </div>

                {/* metadata */}
                <div className='grid grid-cols-2 font-medium text-[#C4C4C4]'>
                  <div className='space-y-3'>
                    <p className='flex gap-1 text-sm'>
                      <Users size={20}/> {startup.teamSize} Team
                    </p>
                    <p className='flex gap-1.5 text-sm'>
                      <Building2 size={20}/> {startup.industry}
                    </p>
                    <p className='flex gap-1.5 text-sm'>
                      <MapPin size={20}/> {startup.location}
                    </p>
                  </div>
                  <div className='space-y-3'>
                    <p className='flex gap-1.5 text-sm'>
                      <Calendar size={20}/> Founded {startup.founded}
                    </p>
                    <p className='text-sm text-green-500'>
                      {startup.funding} Raised
                    </p>
                  </div>
                </div>
              </div>
              {/* create at */}
              <div className='flex justify-center pt-3'>
                <h1 className='text-[#535353]'>Founded: {startup.founded}</h1>
              </div>
            </div>  
          </Link>
        ))}
      </div>
    </div>
  )
}

export default StartUp