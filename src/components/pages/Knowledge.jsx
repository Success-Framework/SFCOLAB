import React, { useState } from 'react'
import Header from '../sections/Header'
import { List, BriefcaseBusiness, Plus } from 'lucide-react'
import { useLocation, Link } from 'react-router-dom'

const Knowledge = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('Category 1')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file: null
  })
  const [errors, setErrors] = useState({})
  
  const categories = [
    'Category 1',
    'Category 2',
    'Category 3'
  ]

  const handleSelect = (category) => {
    setSelectedCategory(category)
    setIsOpen(false)
  }

  const handleChange = (e) => {
    const { id, value, files } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: files ? files[0] : value
    }))
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    if (!formData.file) {
      newErrors.file = 'Please upload a file'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      // Create FormData object for file upload
      const submitData = new FormData()
      submitData.append('title', formData.title)
      submitData.append('description', formData.description)
      submitData.append('category', selectedCategory)
      submitData.append('file', formData.file)

      // TODO: Replace with your API endpoint
      // const response = await fetch('/api/knowledge', {
      //   method: 'POST',
      //   body: submitData
      // })

      // if (!response.ok) {
      //   throw new Error('Failed to submit')
      // }

      // Reset form after successful submission
      setFormData({
        title: '',
        description: '',
        file: null
      })
      setSelectedCategory('Category 1')
      setErrors({})

      // TODO: Add success notification
      alert('Knowledge resource added successfully!')
    } catch (error) {
      console.error('Error submitting form:', error)
      // TODO: Add error notification
      alert('Failed to add knowledge resource. Please try again.')
    }
  }

  return (
    <>
      <div className="mb-6">
      <Header
          // Search bar customization
          searchContainerClassName='min-w-[50%]'
          searchClassName='w-full'
          
          // Custom dropdown button texts
          dropdowns={{
            available: {
              label: 'Available',
              buttonText: 'All Categories',
              options: [
                { label: 'Available', href: '/status/available' },
                { label: 'Busy', href: '/status/busy' },
                { label: 'Away', href: '/status/away' },
                { label: 'Offline', href: '/status/offline' }
              ],
              className: 'bg-white/10 text-white hover:bg-white/20',
              icon: null,
              show: true,
            },
            userType: {
              label: 'User Type',
              buttonText: 'Newest First',
              options: [
                { label: 'Admin', href: '/roles/admin' },
                { label: 'Manager', href: '/roles/manager' },
                { label: 'Employee', href: '/roles/employee' },
                { label: 'Guest', href: '/roles/guest' }
              ],
              className: 'bg-white/10 text-white hover:bg-white/20',
              icon: List,
              show: true,
              buttonSize: 'default'
            },
            addKnowledge: {
              label: 'Add Knowledge',
              buttonText: 'Add Knowledge',
              href: '/knowledge/new',
              className: 'bg-white text-gray-600 hover:bg-white/70',
              icon: Plus,
              show: true,
              buttonSize: 'default'
            }
          }}

          // Mobile menu customization
          mobileMenuItems={{
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
          }}

          // Custom mobile menu button text
          mobileMenuButtonText="Open Menu"

          // Custom search button text
          searchButtonText="Search Items"

          // Event handlers
          onDropdownOptionClick={(key, option) => {
            console.log(`${key}: ${option.label} selected`);
          }}
          onMobileMenuOptionClick={(title, option) => {
            console.log(`${title}: ${option.label} selected`);
          }}
          onSearch={(value) => {
            console.log('Search:', value);
          }}
        />
      </div>
      <div className='h-screen w-full flex items-center justify-center'>
        <div className='w-[600px] min-h-[600px] bg-[#1A1A1A] rounded-4xl p-7 space-y-10'>
          {/* header */}
          <div className='flex justify-between'>
            <h1 className='text-3xl font-medium'>Add new Knowledge resource</h1>
          </div>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="title">Title</label>
              <input 
                type="text" 
                id='title' 
                placeholder='Enter title' 
                className={`bg-[#232323] rounded-full p-2 ${errors.title ? 'border border-red-500' : ''}`}
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="description">Description</label>
              <textarea 
                id='description' 
                placeholder='Enter description' 
                className={`bg-[#232323] rounded-md p-2 ${errors.description ? 'border border-red-500' : ''}`}
                rows={8}
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="file">Category</label>
              <div className='relative'>
                <div 
                  className='bg-[#232323] rounded-full p-2 cursor-pointer flex justify-between items-center'
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span>{selectedCategory}</span>
                </div>
                {isOpen && (
                  <div className='absolute top-full left-0 w-full mt-1 bg-[#232323] rounded-full shadow-lg z-10'>
                    {categories.map((category, index) => (
                      <div
                        key={index}
                        className='p-2 hover:bg-white/10 cursor-pointer'
                        onClick={() => handleSelect(category)}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="file">Upload file</label>
              <input 
                type="file" 
                id='file' 
                className={`bg-[#232323] rounded-full p-2 ${errors.file ? 'border border-red-500' : ''}`}
                onChange={handleChange}
              />
              {errors.file && <span className="text-red-500 text-sm">{errors.file}</span>}
            </div>
            <div className='flex justify-end gap-2'>
              <button 
                type='button' 
                className='bg-[#232323] rounded-full p-2'
                onClick={() => {
                  setFormData({
                    title: '',
                    description: '',
                    file: null
                  })
                  setSelectedCategory('Category 1')
                  setErrors({})
                }}
              >
                Cancel
              </button>
              <button 
                type='submit' 
                className='bg-[#fff] text-[#000] rounded-full p-2'
              >
                Add Resource
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Knowledge