import React, { useState } from 'react'
import { ArrowLeft, Share2, BookmarkPlus, Users, Briefcase, Star, Calendar, Clock, MessageSquare, Send, Image as ImageIcon, Link as LinkIcon, CheckCircle2, MapPin, Building2, DollarSign, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import { allimg } from "../../utils"

const StartUpdetails = () => {
  const [isJoined, setIsJoined] = useState(false)
  const [comment, setComment] = useState('')

  const startupDetails = {
    id: 1,
    name: "TechVision AI",
    logo: allimg.profileImg,
    description: "Revolutionizing healthcare through AI-powered diagnostic solutions. Our platform helps doctors make faster and more accurate diagnoses while reducing healthcare costs.",
    industry: "Healthcare",
    stage: "Series A",
    location: "San Francisco, CA",
    founded: "January 2023",
    teamSize: "25-50",
    funding: "$5.2M",
    website: "https://techvision.ai",
    social: {
      linkedin: "https://linkedin.com/company/techvision",
      twitter: "https://twitter.com/techvision"
    },
    metrics: {
      users: "10K+",
      accuracy: "95%",
      hospitals: "50+"
    },
    team: [
      {
        name: "Sarah Chen",
        role: "CEO & Co-founder",
        avatar: allimg.profileImg,
        bio: "Former Google AI researcher with 10+ years of experience in healthcare technology."
      },
      {
        name: "Michael Rodriguez",
        role: "CTO & Co-founder",
        avatar: allimg.profileImg,
        bio: "PhD in Computer Science from Stanford, specializing in machine learning."
      }
    ],
    milestones: [
      {
        date: "January 2023",
        title: "Company Founded",
        description: "Launched with seed funding of $1.5M"
      },
      {
        date: "June 2023",
        title: "Series A Funding",
        description: "Raised $5.2M from leading healthcare VCs"
      },
      {
        date: "September 2023",
        title: "Product Launch",
        description: "Released first version of AI diagnostic platform"
      }
    ],
    feedback: [
      {
        id: 1,
        user: {
          name: 'Dr. James Wilson',
          avatar: allimg.profileImg,
          role: 'Chief Medical Officer, City Hospital'
        },
        comment: 'TechVision AI has significantly improved our diagnostic accuracy and reduced patient wait times.',
        timestamp: '2 days ago',
        rating: 5
      },
      {
        id: 2,
        user: {
          name: 'Lisa Thompson',
          avatar: allimg.profileImg,
          role: 'Healthcare Investor'
        },
        comment: 'Impressive technology and strong team. The market potential is enormous.',
        timestamp: '1 week ago',
        rating: 4
      }
    ]
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <Link to="/startup" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Back to Startups</span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-4">
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <BookmarkPlus className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-8">
            {/* Startup Header */}
            <div className="bg-[#1A1A1A] rounded-2xl sm:rounded-4xl p-4 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-0 mb-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                  <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden bg-zinc-700">
                    <img src={startupDetails.logo} alt={startupDetails.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h1 className="text-xl sm:text-2xl font-bold mb-2">{startupDetails.name}</h1>
                    <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-3">
                      <span className="bg-blue-600 text-white text-xs sm:text-sm px-3 py-1 rounded-full">
                        {startupDetails.industry}
                      </span>
                      <span className="bg-green-600 text-white text-xs sm:text-sm px-3 py-1 rounded-full">
                        {startupDetails.stage}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsJoined(!isJoined)}
                  className={`px-4 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                    isJoined
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isJoined ? (
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
                      Joined
                    </span>
                  ) : (
                    'Join Startup'
                  )}
                </button>
              </div>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                {startupDetails.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-[#2A2A2A] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    <span className="text-xs sm:text-sm text-gray-400">Location</span>
                  </div>
                  <p className="font-medium text-sm sm:text-base">{startupDetails.location}</p>
                </div>
                <div className="bg-[#2A2A2A] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="h-5 w-5 text-blue-500" />
                    <span className="text-xs sm:text-sm text-gray-400">Team Size</span>
                  </div>
                  <p className="font-medium text-sm sm:text-base">{startupDetails.teamSize}</p>
                </div>
                <div className="bg-[#2A2A2A] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-5 w-5 text-blue-500" />
                    <span className="text-xs sm:text-sm text-gray-400">Funding</span>
                  </div>
                  <p className="font-medium text-sm sm:text-base">{startupDetails.funding}</p>
                </div>
                <div className="bg-[#2A2A2A] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    <span className="text-xs sm:text-sm text-gray-400">Founded</span>
                  </div>
                  <p className="font-medium text-sm sm:text-base">{startupDetails.founded}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={startupDetails.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400 transition-colors text-sm sm:text-base"
                >
                  Visit Website
                </a>
                <a
                  href={startupDetails.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400 transition-colors text-sm sm:text-base"
                >
                  LinkedIn
                </a>
                <a
                  href={startupDetails.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400 transition-colors text-sm sm:text-base"
                >
                  Twitter
                </a>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="bg-[#1A1A1A] rounded-2xl sm:rounded-4xl p-4 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Key Metrics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-[#2A2A2A] rounded-xl p-4 sm:p-6 text-center">
                  <Target className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 mx-auto mb-2 sm:mb-3" />
                  <p className="text-xl sm:text-2xl font-bold mb-1">{startupDetails.metrics.users}</p>
                  <p className="text-gray-400 text-sm sm:text-base">Active Users</p>
                </div>
                <div className="bg-[#2A2A2A] rounded-xl p-4 sm:p-6 text-center">
                  <Target className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 mx-auto mb-2 sm:mb-3" />
                  <p className="text-xl sm:text-2xl font-bold mb-1">{startupDetails.metrics.accuracy}</p>
                  <p className="text-gray-400 text-sm sm:text-base">Diagnostic Accuracy</p>
                </div>
                <div className="bg-[#2A2A2A] rounded-xl p-4 sm:p-6 text-center">
                  <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500 mx-auto mb-2 sm:mb-3" />
                  <p className="text-xl sm:text-2xl font-bold mb-1">{startupDetails.metrics.hospitals}</p>
                  <p className="text-gray-400 text-sm sm:text-base">Partner Hospitals</p>
                </div>
              </div>
            </div>

            {/* Team */}
            <div className="bg-[#1A1A1A] rounded-2xl sm:rounded-4xl p-4 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Team</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {startupDetails.team.map((member, index) => (
                  <div key={index} className="bg-[#2A2A2A] rounded-xl p-4 sm:p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full"
                      />
                      <div>
                        <h3 className="font-medium text-sm sm:text-base">{member.name}</h3>
                        <p className="text-gray-400 text-xs sm:text-sm">{member.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm sm:text-base">{member.bio}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Milestones */}
            <div className="bg-[#1A1A1A] rounded-2xl sm:rounded-4xl p-4 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Milestones</h2>
              <div className="space-y-4">
                {startupDetails.milestones.map((milestone, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                      {index !== startupDetails.milestones.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-700" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm sm:text-base font-medium">{milestone.date}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm sm:text-base font-medium">{milestone.title}</span>
                      </div>
                      <p className="text-gray-400 text-sm sm:text-base">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback */}
            <div className="bg-[#1A1A1A] rounded-2xl sm:rounded-4xl p-4 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Feedback</h2>
              <div className="space-y-4">
                {startupDetails.feedback.map((item) => (
                  <div key={item.id} className="bg-[#2A2A2A] rounded-xl p-4 sm:p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={item.user.avatar}
                        alt={item.user.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                      />
                      <div>
                        <h3 className="font-medium text-sm sm:text-base">{item.user.name}</h3>
                        <p className="text-gray-400 text-xs sm:text-sm">{item.user.role}</p>
                      </div>
                      <div className="ml-auto flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < item.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm sm:text-base mb-2">{item.comment}</p>
                    <span className="text-gray-400 text-xs sm:text-sm">{item.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Quick Info */}
          <div className="space-y-4 sm:space-y-8">
            {/* Quick Info */}
            <div className="bg-[#1A1A1A] rounded-2xl sm:rounded-4xl p-4 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Quick Info</h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm sm:text-base">Status</span>
                  <span className="text-green-500 text-sm sm:text-base">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm sm:text-base">Founded</span>
                  <span className="text-sm sm:text-base">{startupDetails.founded}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm sm:text-base">Location</span>
                  <span className="text-sm sm:text-base">{startupDetails.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm sm:text-base">Team Size</span>
                  <span className="text-sm sm:text-base">{startupDetails.teamSize}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm sm:text-base">Funding</span>
                  <span className="text-sm sm:text-base">{startupDetails.funding}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StartUpdetails