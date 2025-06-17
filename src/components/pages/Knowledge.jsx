import React from 'react'
import KnowledgeHeader from '../headers/KnowledgeHeader'
import { FileText, Calendar, User, Tag } from 'lucide-react'
import { Link } from 'react-router-dom'

const Knowledge = () => {
  const getRandomColor = () => {
    const colors = ['bg-red-700', 'bg-yellow-600', 'bg-gray-600', 'bg-green-600']
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const knowledgeContent = [
    {
      id: 1,
      title: 'Marketing Strategy Guide 2024',
      description: 'Comprehensive guide covering modern marketing strategies, including digital marketing, social media, and content marketing approaches for startups.',
      category: 'Marketing',
      author: 'John Doe',
      date: '6/3/2024',
      fileType: 'PDF',
      views: '1.2k'
    },
    {
      id: 2,
      title: 'Product Development Framework',
      description: 'A detailed framework for product development, from ideation to launch, including best practices and common pitfalls to avoid.',
      category: 'Product',
      author: 'Jane Smith',
      date: '5/3/2024',
      fileType: 'DOC',
      views: '856'
    },
    {
      id: 3,
      title: 'Technical Documentation Template',
      description: 'Standardized template for technical documentation, ensuring consistency and clarity in project documentation.',
      category: 'Development',
      author: 'Mike Johnson',
      date: '4/3/2024',
      fileType: 'PDF',
      views: '2.1k'
    },
    {
      id: 4,
      title: 'Financial Planning for Startups',
      description: 'Essential financial planning guide for startups, covering budgeting, fundraising, and financial management.',
      category: 'Finance',
      author: 'Sarah Wilson',
      date: '3/3/2024',
      fileType: 'XLS',
      views: '1.5k'
    }
  ]

  return (
    <div className='h-screen overflow-y-auto overflow-hidden'>
      <KnowledgeHeader />
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-4'>
        {knowledgeContent.map(content => (
          <Link key={content.id} to={`/knowledge/${content.id}`} className='bg-[#232323] rounded-4xl h-full'>
            <div className='w-full h-full p-2'>
              <div className='bg-[#1A1A1A] flex-1 items-center justify-center min-h-[330px] rounded-4xl p-7 space-y-10'>
                {/* header */}
                <div className='flex w-full justify-between'>
                  <h1 className='text-lg font-bold'>{content.title}</h1>
                  <button className={`${getRandomColor()} text-sm px-1 font-medium rounded-sm`}>{content.fileType}</button>
                </div>

                {/* content */}
                <div className='text-sm font-medium leading-tight text-[#C4C4C4]'>{content.description}</div>

                {/* metadata */}
                <div className='grid grid-cols-2 font-medium text-[#C4C4C4]'>
                  <div className='space-y-3'>
                    <p className='flex gap-1 text-sm'><User size={20}/> {content.author}</p>
                    <p className='flex gap-1.5 text-sm'><Tag size={20}/> {content.category}</p>
                    <p className='flex gap-1.5 text-sm'><FileText size={20}/> {content.views} views</p>
                  </div>
                  <div className='flex gap-1.5 text-sm'><Calendar size={20} /> {content.date}</div>
                </div>
              </div>
              {/* create at */}
              <div className='flex justify-center pt-3'>
                <h1 className='text-[#535353]'>Added: {content.date}</h1>
              </div>
            </div>  
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Knowledge