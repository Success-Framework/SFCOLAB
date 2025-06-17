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
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/startup" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Startups</span>
            </Link>
            <div className="flex items-center gap-4">
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
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Startup Header */}
            <div className="bg-[#1A1A1A] rounded-4xl p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-6">
                  <div className="h-24 w-24 rounded-full overflow-hidden bg-zinc-700">
                    <img src={startupDetails.logo} alt={startupDetails.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold mb-2">{startupDetails.name}</h1>
                    <div className="flex items-center gap-3">
                      <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                        {startupDetails.industry}
                      </span>
                      <span className="bg-green-600 text-white text-sm px-3 py-1 rounded-full">
                        {startupDetails.stage}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsJoined(!isJoined)}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    isJoined
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isJoined ? (
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      Joined
                    </span>
                  ) : (
                    'Join Startup'
                  )}
                </button>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {startupDetails.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-[#2A2A2A] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    <span className="text-sm text-gray-400">Location</span>
                  </div>
                  <p className="font-medium">{startupDetails.location}</p>
                </div>
                <div className="bg-[#2A2A2A] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="h-5 w-5 text-blue-500" />
                    <span className="text-sm text-gray-400">Team Size</span>
                  </div>
                  <p className="font-medium">{startupDetails.teamSize}</p>
                </div>
                <div className="bg-[#2A2A2A] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-5 w-5 text-blue-500" />
                    <span className="text-sm text-gray-400">Funding</span>
                  </div>
                  <p className="font-medium">{startupDetails.funding}</p>
                </div>
                <div className="bg-[#2A2A2A] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    <span className="text-sm text-gray-400">Founded</span>
                  </div>
                  <p className="font-medium">{startupDetails.founded}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href={startupDetails.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400 transition-colors"
                >
                  Visit Website
                </a>
                <a
                  href={startupDetails.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400 transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href={startupDetails.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400 transition-colors"
                >
                  Twitter
                </a>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="bg-[#1A1A1A] rounded-4xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Key Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#2A2A2A] rounded-xl p-6 text-center">
                  <Target className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                  <p className="text-2xl font-bold mb-1">{startupDetails.metrics.users}</p>
                  <p className="text-gray-400">Active Users</p>
                </div>
                <div className="bg-[#2A2A2A] rounded-xl p-6 text-center">
                  <Target className="h-8 w-8 text-green-500 mx-auto mb-3" />
                  <p className="text-2xl font-bold mb-1">{startupDetails.metrics.accuracy}</p>
                  <p className="text-gray-400">Diagnostic Accuracy</p>
                </div>
                <div className="bg-[#2A2A2A] rounded-xl p-6 text-center">
                  <Building2 className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                  <p className="text-2xl font-bold mb-1">{startupDetails.metrics.hospitals}</p>
                  <p className="text-gray-400">Partner Hospitals</p>
                </div>
              </div>
            </div>

            {/* Team */}
            <div className="bg-[#1A1A1A] rounded-4xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {startupDetails.team.map((member, index) => (
                  <div key={index} className="bg-[#2A2A2A] rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-16 h-16 rounded-full"
                      />
                      <div>
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-gray-400">{member.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-300">{member.bio}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Milestones */}
            <div className="bg-[#1A1A1A] rounded-4xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Milestones</h2>
              <div className="space-y-6">
                {startupDetails.milestones.map((milestone, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full" />
                      {index !== startupDetails.milestones.length - 1 && (
                        <div className="w-0.5 h-full bg-blue-500" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{milestone.title}</h3>
                        <span className="text-sm text-gray-400">{milestone.date}</span>
                      </div>
                      <p className="text-gray-300">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback */}
            <div className="bg-[#1A1A1A] rounded-4xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Feedback</h2>
              <div className="space-y-6">
                {startupDetails.feedback.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.user.avatar}
                      alt={item.user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-medium">{item.user.name}</h3>
                          <p className="text-sm text-gray-400">{item.user.role}</p>
                        </div>
                        <span className="text-sm text-gray-400">{item.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                      <p className="text-gray-300 mb-2">{item.comment}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comment Input */}
              <div className="mt-8">
                <div className="flex gap-4">
                  <img
                    src={allimg.profileImg}
                    alt="Your avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add your feedback..."
                      className="w-full bg-[#2A2A2A] rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                          <ImageIcon className="h-5 w-5" />
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                          <LinkIcon className="h-5 w-5" />
                        </button>
                      </div>
                      <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        <Send className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Info */}
          <div className="space-y-8">
            {/* Quick Info */}
            <div className="bg-[#1A1A1A] rounded-4xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Quick Info</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Industry</span>
                  <span>{startupDetails.industry}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Stage</span>
                  <span>{startupDetails.stage}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Location</span>
                  <span>{startupDetails.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Founded</span>
                  <span>{startupDetails.founded}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Team Size</span>
                  <span>{startupDetails.teamSize}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Funding</span>
                  <span>{startupDetails.funding}</span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-[#1A1A1A] rounded-4xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Contact</h2>
              <div className="space-y-4">
                <a
                  href={startupDetails.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-500 hover:text-blue-400 transition-colors"
                >
                  {startupDetails.website}
                </a>
                <a
                  href={startupDetails.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-500 hover:text-blue-400 transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href={startupDetails.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-500 hover:text-blue-400 transition-colors"
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StartUpdetails