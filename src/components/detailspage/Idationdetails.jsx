import React, { useState } from 'react'
import { ArrowLeft, Share2, BookmarkPlus, MessageSquare, ThumbsUp, Users, Tag, Calendar, Clock, Send, Image as ImageIcon, Link as LinkIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const Idationdetails = () => {
  const [comment, setComment] = useState('')

  const ideaDetails = {
    id: 1,
    title: 'Smart Parenting Assistant',
    description: `A comprehensive mobile application designed to help parents manage their daily family activities, track children's development, and connect with other parents in their community. The app will feature AI-powered suggestions for age-appropriate activities, meal planning, and educational content.`,
    category: 'Technology',
    stage: 'Idea Stage',
    createdAt: 'March 15, 2024',
    author: {
      name: 'Sarah Johnson',
      role: 'Product Designer',
      avatar: 'https://i.pravatar.cc/150?img=5'
    },
    tags: ['Parenting', 'Mobile App', 'AI', 'Education'],
    likes: 45,
    comments: 12,
    collaborators: [
      {
        name: 'Mike Chen',
        role: 'Developer',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      {
        name: 'Emma Davis',
        role: 'UX Researcher',
        avatar: 'https://i.pravatar.cc/150?img=2'
      },
      {
        name: 'Alex Wong',
        role: 'Business Analyst',
        avatar: 'https://i.pravatar.cc/150?img=3'
      }
    ],
    feedback: [
      {
        id: 1,
        user: {
          name: 'David Miller',
          avatar: 'https://i.pravatar.cc/150?img=4'
        },
        comment: "Great idea! Consider adding a feature for tracking children's health records and vaccination schedules.",
        timestamp: '2 hours ago',
        likes: 5
      },
      {
        id: 2,
        user: {
          name: 'Lisa Park',
          avatar: 'https://i.pravatar.cc/150?img=6'
        },
        comment: 'Would love to see integration with popular calendar apps and the ability to share schedules with family members.',
        timestamp: '5 hours ago',
        likes: 3
      }
    ]
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/ideation" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Ideas</span>
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
          {/* Left Column - Main Idea */}
          <div className="lg:col-span-2 space-y-8">
            {/* Idea Header */}
            <div className="bg-[#1A1A1A] rounded-4xl p-8">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-3xl font-bold">{ideaDetails.title}</h1>
                <button className="bg-blue-600 text-sm px-3 py-1 font-medium rounded-sm">
                  {ideaDetails.stage}
                </button>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {ideaDetails.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {ideaDetails.tags.map((tag, index) => (
                  <span key={index} className="bg-[#2A2A2A] text-sm px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-gray-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="h-5 w-5" />
                    {ideaDetails.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-5 w-5" />
                    {ideaDetails.comments}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{ideaDetails.createdAt}</span>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-[#1A1A1A] rounded-4xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Comments & Feedback</h2>
              <div className="space-y-6">
                {ideaDetails.feedback.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.user.avatar}
                      alt={item.user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{item.user.name}</h3>
                        <span className="text-sm text-gray-400">{item.timestamp}</span>
                      </div>
                      <p className="text-gray-300 mb-2">{item.comment}</p>
                      <div className="flex items-center gap-4 text-gray-400">
                        <button className="flex items-center gap-1 hover:text-white transition-colors">
                          <ThumbsUp className="h-4 w-4" />
                          {item.likes}
                        </button>
                        <button className="hover:text-white transition-colors">Reply</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comment Input */}
              <div className="mt-8">
                <div className="flex gap-4">
                  <img
                    src={ideaDetails.author.avatar}
                    alt={ideaDetails.author.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add your comment..."
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

          {/* Right Column - Info & Team */}
          <div className="space-y-8">
            {/* Author Info */}
            <div className="bg-[#1A1A1A] rounded-4xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Author</h2>
              <div className="flex items-center gap-4">
                <img
                  src={ideaDetails.author.avatar}
                  alt={ideaDetails.author.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="font-medium text-lg">{ideaDetails.author.name}</h3>
                  <p className="text-gray-400">{ideaDetails.author.role}</p>
                </div>
              </div>
            </div>

            {/* Collaborators */}
            <div className="bg-[#1A1A1A] rounded-4xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Collaborators</h2>
              <div className="space-y-6">
                {ideaDetails.collaborators.map((member, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-gray-400 text-sm">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-[#1A1A1A] rounded-4xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Quick Info</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Category</span>
                  <span>{ideaDetails.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Stage</span>
                  <span>{ideaDetails.stage}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Created</span>
                  <span>{ideaDetails.createdAt}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Collaborators</span>
                  <span>{ideaDetails.collaborators.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Idationdetails