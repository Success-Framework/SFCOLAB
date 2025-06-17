import React, { useState } from 'react'
import { ArrowLeft, Share2, BookmarkPlus, FileText, Calendar, User, Tag, Download, Eye, ThumbsUp, MessageSquare, Send, Image as ImageIcon, Link as LinkIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const Knowledgedetails = () => {
  const [comment, setComment] = useState('')

  const knowledgeDetails = {
    id: 1,
    title: 'Marketing Strategy Guide 2024',
    description: 'Comprehensive guide covering modern marketing strategies, including digital marketing, social media, and content marketing approaches for startups.',
    fullContent: `# Marketing Strategy Guide 2024

## Introduction
This comprehensive guide provides startups with essential marketing strategies and tactics for 2024. Learn how to leverage digital marketing, social media, and content marketing to grow your business effectively.

## Key Topics Covered
1. Digital Marketing Fundamentals
   - SEO best practices
   - PPC advertising
   - Email marketing strategies
   - Social media marketing

2. Content Marketing
   - Content creation guidelines
   - Distribution strategies
   - Analytics and measurement
   - ROI tracking

3. Social Media Strategy
   - Platform selection
   - Content calendar
   - Community management
   - Paid social advertising

4. Growth Hacking Techniques
   - Viral marketing
   - Referral programs
   - User acquisition
   - Retention strategies

## Best Practices
- Focus on data-driven decisions
- Maintain consistent brand voice
- Optimize for mobile-first
- Leverage automation tools
- Measure and iterate regularly`,
    category: 'Marketing',
    author: {
      name: 'John Doe',
      role: 'Marketing Director',
      avatar: 'https://i.pravatar.cc/150?img=5'
    },
    date: 'March 6, 2024',
    fileType: 'PDF',
    views: '1.2k',
    likes: 45,
    comments: 12,
    downloads: 234,
    tags: ['Marketing', 'Strategy', 'Digital Marketing', 'Content Marketing'],
    relatedResources: [
      {
        id: 2,
        title: 'Product Development Framework',
        category: 'Product',
        fileType: 'DOC',
        views: '856'
      },
      {
        id: 3,
        title: 'Technical Documentation Template',
        category: 'Development',
        fileType: 'PDF',
        views: '2.1k'
      }
    ],
    feedback: [
      {
        id: 1,
        user: {
          name: 'Sarah Wilson',
          avatar: 'https://i.pravatar.cc/150?img=6'
        },
        comment: 'Excellent guide! The section on social media strategy was particularly helpful for our startup.',
        timestamp: '2 hours ago',
        likes: 5
      },
      {
        id: 2,
        user: {
          name: 'Mike Chen',
          avatar: 'https://i.pravatar.cc/150?img=7'
        },
        comment: 'Would love to see more case studies and real-world examples in the next update.',
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
            <Link to="/knowledge" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Resources</span>
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
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Resource Header */}
            <div className="bg-[#1A1A1A] rounded-4xl p-8">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-3xl font-bold">{knowledgeDetails.title}</h1>
                <button className="bg-blue-600 text-sm px-3 py-1 font-medium rounded-sm">
                  {knowledgeDetails.fileType}
                </button>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {knowledgeDetails.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {knowledgeDetails.tags.map((tag, index) => (
                  <span key={index} className="bg-[#2A2A2A] text-sm px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-gray-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Eye className="h-5 w-5" />
                    {knowledgeDetails.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Download className="h-5 w-5" />
                    {knowledgeDetails.downloads}
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="h-5 w-5" />
                    {knowledgeDetails.likes}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{knowledgeDetails.date}</span>
                </div>
              </div>
            </div>

            {/* Content Preview */}
            <div className="bg-[#1A1A1A] rounded-4xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Content Preview</h2>
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-gray-300">
                  {knowledgeDetails.fullContent}
                </pre>
              </div>
              <div className="mt-6 flex justify-center">
                <button className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Download Full Resource
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-[#1A1A1A] rounded-4xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Comments & Feedback</h2>
              <div className="space-y-6">
                {knowledgeDetails.feedback.map((item) => (
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
                    src={knowledgeDetails.author.avatar}
                    alt={knowledgeDetails.author.name}
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

          {/* Right Column - Info & Related */}
          <div className="space-y-8">
            {/* Author Info */}
            <div className="bg-[#1A1A1A] rounded-4xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Author</h2>
              <div className="flex items-center gap-4">
                <img
                  src={knowledgeDetails.author.avatar}
                  alt={knowledgeDetails.author.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="font-medium text-lg">{knowledgeDetails.author.name}</h3>
                  <p className="text-gray-400">{knowledgeDetails.author.role}</p>
                </div>
              </div>
            </div>

            {/* Related Resources */}
            <div className="bg-[#1A1A1A] rounded-4xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Related Resources</h2>
              <div className="space-y-4">
                {knowledgeDetails.relatedResources.map((resource) => (
                  <Link
                    key={resource.id}
                    to={`/knowledge/${resource.id}`}
                    className="block p-4 bg-[#2A2A2A] rounded-xl hover:bg-[#333333] transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{resource.title}</h3>
                      <span className="text-sm text-gray-400">{resource.fileType}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{resource.category}</span>
                      <span>{resource.views} views</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-[#1A1A1A] rounded-4xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Quick Info</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Category</span>
                  <span>{knowledgeDetails.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">File Type</span>
                  <span>{knowledgeDetails.fileType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Added</span>
                  <span>{knowledgeDetails.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Downloads</span>
                  <span>{knowledgeDetails.downloads}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Knowledgedetails