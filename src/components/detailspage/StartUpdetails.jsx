import React, { useState } from 'react'
import { ArrowLeft, Share2, BookmarkPlus, Users, Briefcase, Star, Calendar, Clock, MessageSquare, Send, Image as ImageIcon, Link as LinkIcon, CheckCircle2, MapPin, Building2, DollarSign, Target, UserPlus, PhoneOutgoing } from 'lucide-react'
import { IoPersonAdd } from "react-icons/io5";
import { FaMessage } from "react-icons/fa6";

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

  const coverImage = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80";
  // Funding breakdown mock data
  const fundingStages = [
    { stage: "Seed", amount: 1500000 },
    { stage: "Series A", amount: 5200000 },
    { stage: "Goal", amount: 10000000 },
  ];
  // Documents mock data
  const documents = [
    { type: "Pitch Deck", url: "#", icon: <ImageIcon className="inline mr-2" /> },
    { type: "Business Plan", url: "#", icon: <LinkIcon className="inline mr-2" /> },
    { type: "Intro Video", url: "#", icon: <ImageIcon className="inline mr-2" /> },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Cover + Hero */}
      <div className="relative w-full h-48 sm:h-64 mb-8">
        <img src={coverImage} alt="Cover" className="w-full h-full object-cover rounded-b-3xl" />
        <div className="absolute inset-0 bg-black/40 rounded-b-3xl flex flex-col justify-end p-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden bg-zinc-700 border-4 border-white">
              <img src={startupDetails.logo} alt={startupDetails.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              {/* <div className="flex items-center max-sm:justify-center text-xs sm:text-sm gap-x-6"> */}
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">{startupDetails.name}</h1>
              {/* </div> */}
              
              <p className="text-gray-200 text-sm sm:text-base mb-1">{startupDetails.description}</p>
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-3">
                <span className="bg-blue-600 text-white text-xs sm:text-sm px-3 py-1 rounded-full">{startupDetails.industry}</span>
                <span className="bg-green-600 text-white text-xs sm:text-sm px-3 py-1 rounded-full">{startupDetails.stage}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-3 mb-6 items-center justify-center sm:justify-end">
        <button className="bg-white hover:bg-white text-black px-4 py-2 rounded-md font-medium">Support</button>
        <button className="hover:bg-white/10 text-white border border-white px-4 py-2 rounded-md font-medium">Apply to Join</button>
        <button className="border border-white rounded-md text-white p-2 font-medium">
<PhoneOutgoing />
        </button>
        <button className="border border-white rounded-md text-white p-2 font-medium">
<UserPlus />

        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-8">
            {/* Funding Breakdown */}
            <div className="bg-[#1A1A1A] rounded-2xl sm:rounded-4xl p-4 sm:p-8 mb-4">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Funding Breakdown</h2>
              <div className="flex flex-col gap-4">
                {fundingStages.map((stage, idx) => (
                  <div key={stage.stage} className="flex items-center gap-4">
                    <span className="w-20 text-xs sm:text-sm font-semibold text-gray-300">{stage.stage}</span>
                    <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${idx === fundingStages.length - 1 ? 'bg-yellow-500' : 'bg-blue-500'}`}
                        style={{ width: `${Math.min(100, (stage.amount / fundingStages[fundingStages.length - 1].amount) * 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-white">${(stage.amount / 1000).toLocaleString()}k</span>
                  </div>
                ))}
                </div>
              </div>

            {/* Documents Section */}
            <div className="bg-[#1A1A1A] rounded-2xl sm:rounded-4xl p-4 sm:p-8 mb-4">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Documents</h2>
              <div className="flex flex-wrap gap-4">
                {documents.map((doc, idx) => (
                  <a key={idx} href={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#232323] hover:bg-[#333] px-4 py-2 rounded-lg text-white font-medium transition-colors">
                    {doc.icon} {doc.type}
                  </a>
                ))}
              </div>
            </div>

            {/* AI Matchmaking Widget (placeholder) */}
            <div className="bg-[#1A1A1A] rounded-2xl sm:rounded-4xl p-4 sm:p-8 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Users className="text-blue-400" size={24} />
                <span className="text-white font-semibold">AI Matchmaking</span>
                <span className="text-gray-400 text-xs sm:text-sm">Suggested contributors and investors for this startup!</span>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">Get Suggestions</button>
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
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-blue-500"
                      />
                      <div>
                        <h3 className="font-medium text-sm sm:text-base flex items-center gap-2">{member.name} <span className="bg-blue-700 text-white text-xs px-2 py-0.5 rounded-full">@{member.role.split(' ')[0].toLowerCase()}</span></h3>
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