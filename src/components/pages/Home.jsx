import { BriefcaseBusiness, CheckCheck, LocateIcon, User, List } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const getRandomColor = () => {
    const colors = ['bg-red-700', 'bg-yellow-600', 'bg-gray-600', 'bg-green-600']
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const cardContent = [
    {
      id:1,
      header:'ABC - Marketing side',
      content:`ABC is an application for parents, to make their life easier by helping them organize and track each task. Now we're looking for effective marketers. We are leaning towards female market.`,
      people:'10',
      technology:'technology',
      location:'Location',
      href:'',
      createAt:'6/3/2025',
      task:'Tasks'
    },
    {
      id:2,
      header:'ABC - Marketing side',
      content:`ABC is an application for parents, to make their life easier by helping them organize and track each task. Now we're looking for effective marketers. We are leaning towards female market.`,
      people:'10',
      technology:'technology',
      location:'Location',
      href:'',
      createAt:'6/3/2025',
      task:'Tasks'
    },
    {
      id:3,
      header:'ABC - Marketing side',
      content:`ABC is an application for parents, to make their life easier by helping them organize and track each task. Now we're looking for effective marketers. We are leaning towards female market.`,
      people:'10',
      technology:'technology',
      location:'Location',
      href:'',
      createAt:'6/3/2025',
      task:'Tasks'
    },
    {
      id:4,
      header:'ABC - Marketing side',
      content:`ABC is an application for parents, to make their life easier by helping them organize and track each task. Now we're looking for effective marketers. We are leaning towards female market.`,
      people:'10',
      technology:'technology',
      location:'Location',
      href:'',
      createAt:'6/3/2025',
      task:'Tasks'
    },
    {
      id:5,
      header:'ABC - Marketing side',
      content:`ABC is an application for parents, to make their life easier by helping them organize and track each task. Now we're looking for effective marketers. We are leaning towards female market.`,
      people:'10',
      technology:'technology',
      location:'Location',
      href:'',
      createAt:'6/3/2025',
      task:'Tasks'
    },
  ]

  return (
    <div className='h-screen overflow-y-auto overflow-hidden'>
      <div>
      
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-4'>
        {cardContent.map(content => (
          <Link key={content.id} to={content.href} className='bg-[#232323] rounded-4xl h-full'>
            <div className='w-full h-full p-2'>
              <div className='bg-[#1A1A1A] flex-1 items-center justify-center min-h-[330px] rounded-4xl p-7 space-y-10'>
                {/* header */}
                <div className='flex w-full justify-between'>
                  <h1 className='text-lg font-bold'>{content.header}</h1>
                  <button className={`${getRandomColor()} text-sm px-1 font-medium rounded-sm`}>IDEA Stage</button>
                </div>

                {/* content */}
                <div className='text-sm font-medium leading-tight text-[#C4C4C4]'>{content.content}</div>

                {/* roles */}
                <div className='grid grid-cols-2 font-medium text-[#C4C4C4]'>
                  <div className='space-y-3'>
                    <p className='flex gap-1 text-sm'><User size={20}/> {content.people} Role</p>
                    <p className='flex gap-1.5 text-sm'><BriefcaseBusiness size={20}/> {content.technology}</p>
                    <p className='flex gap-1.5 text-sm'><LocateIcon size={20}/> {content.location}</p>
                  </div>
                  <div className='flex gap-1.5 text-sm'><CheckCheck size={20} /> {content.task}</div>
                </div>
              </div>
              {/* create at */}
              <div className='flex justify-center pt-3'>
                <h1 className='text-[#535353]'>Created: {content.createAt}</h1>
              </div>
            </div>  
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home