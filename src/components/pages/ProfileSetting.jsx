"use client"

import { Check, User, X } from "lucide-react"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const ProfileSetting = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [bioLength, setBioLength] = useState(0)
  const [formData, setFormData] = useState({
    username: "sfcollab",
    profileUrl: "https://sfcollab.com/",
    bio: "",
    facebook: "https://www.facebook.com",
    twitter: "https://www.twitter.com",
    linkedin: "https://www.linkedin.com"
  })

  const handleBioChange = (e) => {
    setBioLength(e.target.value.length)
    setFormData(prev => ({ ...prev, bio: e.target.value }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // ... (keep your existing submit logic)
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6 md:space-y-10">
        {/* Profile Details Header */}
        <div className="border-b border-white/10 pb-4">
          <h2 className="text-xl md:text-2xl font-medium mb-1 md:mb-2">Profile Details</h2>
          <p className="text-[#C4C4C4] text-sm md:text-base">
            You can change your profile details here seamlessly.
          </p>
        </div>

        {/* Profile Picture Section */}
        <div className="flex flex-col md:flex-row gap-4 border-b border-white/10 pb-4">
          <div className="w-full md:w-1/2">
            <h3 className="text-lg md:text-xl font-medium">Profile Picture</h3>
            <p className="text-[#C4C4C4] text-sm md:text-base">
              This is where people will see your actual face
            </p>
          </div>
          <div className="w-full md:w-1/2 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
              <img 
                src="/placeholder.svg" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full sm:w-auto">
              <button 
                type="button" 
                className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full transition-colors text-sm md:text-base"
              >
                Change Picture
              </button>
              <button 
                type="button" 
                className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full transition-colors text-sm md:text-base"
              >
                Delete Picture
              </button>
            </div>
          </div>
        </div>

        {/* Public Profile Section */}
        <div className="flex flex-col md:flex-row gap-4 border-b border-white/10 pb-4">
          <div className="w-full md:w-1/2 space-y-1 md:space-y-2">
            <h3 className="text-lg md:text-xl font-medium">Public Profile</h3>
            <p className="text-[#C4C4C4] text-sm md:text-base">
              This is the main profile that will be visible for everyone.
            </p>
          </div>
          <div className="w-full md:w-1/2 space-y-3">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                <User className="w-4 h-4" />
              </span>
              <input 
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full bg-[#232323] rounded-full p-2 pl-8 text-sm md:text-base"
              />
            </div>
            <input 
              type="text"
              name="profileUrl"
              value={formData.profileUrl}
              onChange={handleChange}
              className="w-full bg-[#232323] rounded-full p-2 text-sm md:text-base"
            />
          </div>
        </div>

        {/* Bio Description Section */}
        <div className="flex flex-col md:flex-row gap-4 border-b border-white/10 pb-4">
          <div className="w-full md:w-1/2">
            <h3 className="text-lg md:text-xl font-medium">Bio Description</h3>
            <p className="text-[#C4C4C4] text-sm md:text-base">
              This will be your main story. Keep it very long.
            </p>
          </div>
          <div className="w-full md:w-1/2 space-y-2">
            <textarea 
              name="bio"
              value={formData.bio}
              onChange={handleBioChange}
              maxLength={350}
              rows={5}
              placeholder="Enter your bio here"
              className="w-full bg-[#232323] rounded-md p-2 min-h-[120px] text-sm md:text-base"
            />
            <div className="text-right text-xs md:text-sm text-[#C4C4C4]">
              {bioLength}/350
            </div>
          </div>
        </div>

        {/* Social Media Links Section */}
        <div className="flex flex-col md:flex-row gap-4 border-b border-white/10 pb-4">
          <div className="w-full md:w-1/2">
            <h3 className="text-lg md:text-xl font-medium">Social Media Links</h3>
            <p className="text-[#C4C4C4] text-sm md:text-base">
              Links for your social media.
            </p>
          </div>
          <div className="w-full md:w-1/2 space-y-2">
            <div className="flex flex-col sm:flex-row">
              <div className="bg-[#232323] rounded-t-md sm:rounded-tr-none sm:rounded-l-md border-b sm:border-b-0 sm:border-r border-white/10 p-2 text-sm whitespace-nowrap">
                facebook.com/
              </div>
              <input 
                type="text"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                className="flex-1 bg-[#232323] rounded-b-md sm:rounded-bl-none sm:rounded-r-md p-2 text-sm md:text-base"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row">
              <div className="bg-[#232323] rounded-t-md sm:rounded-tr-none sm:rounded-l-md border-b sm:border-b-0 sm:border-r border-white/10 p-2 text-sm whitespace-nowrap">
                twitter.com/
              </div>
              <input 
                type="text"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                className="flex-1 bg-[#232323] rounded-b-md sm:rounded-bl-none sm:rounded-r-md p-2 text-sm md:text-base"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row">
              <div className="bg-[#232323] rounded-t-md sm:rounded-tr-none sm:rounded-l-md border-b sm:border-b-0 sm:border-r border-white/10 p-2 text-sm whitespace-nowrap">
                linkedin.com/
              </div>
              <input 
                type="text"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="flex-1 bg-[#232323] rounded-b-md sm:rounded-bl-none sm:rounded-r-md p-2 text-sm md:text-base"
              />
            </div>
          </div>
        </div>

        {/* Form Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2">
          <button 
            type="button" 
            className="bg-[#232323] hover:bg-white/10 text-white px-4 py-2 rounded-full transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
          >
            Cancel <X className="w-4 h-4" />
          </button>
          <button 
            type="submit" 
            disabled={isLoading}
            className="bg-white text-black hover:bg-white/90 px-4 py-2 rounded-full transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm md:text-base mb-2 sm:mb-0"
          >
            {isLoading ? "Saving..." : "Save Settings"} <Check className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProfileSetting