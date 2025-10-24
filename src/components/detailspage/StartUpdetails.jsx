import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import {
  ArrowLeft,
  Share2,
  Bookmark,
  Users,
  Briefcase,
  Star,
  Calendar,
  Clock,
  MessageSquare,
  Send,
  Image as ImageIcon,
  Link as LinkIcon,
  CheckCircle2,
  MapPin,
  Building2,
  DollarSign,
  Target
} from 'lucide-react'
import { allimg } from "../../utils"

const StartUpdetails = () => {
  const [isJoined, setIsJoined] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [joinLoading, setJoinLoading] = useState(false)
  const [joinMessage, setJoinMessage] = useState('')
  const [startupDetails, setStartupDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [searchParams] = useSearchParams()
  const startupId = searchParams.get('id')

  // Fetch startup details from backend
  const fetchStartup = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`https://sfcollab-backend.onrender.com/api/startup/${startupId}`, { withCredentials: true })
      setStartupDetails(res.data.startup)
      setLoading(false)

      // Check if user is already a member
      const isMember = res.data.startup.members?.some(
        m => m.userId === res.data.userId
      )
      setIsJoined(isMember)
    } catch (err) {
      console.error('Failed to fetch startup:', err)
      setError('Failed to fetch startup details')
      setLoading(false)
    }
  }

  useEffect(() => {
    if (startupId) fetchStartup()
  }, [startupId])

  const handleBookmark = () => setIsBookmarked(prev => !prev)

  const handleShare = async () => {
    try {
      const url = `${window.location.origin}/startup-details?id=${startupId}`
      if (navigator.share) {
        await navigator.share({ title: startupDetails.name, url })
      } else {
        await navigator.clipboard.writeText(url)
      }
    } catch (e) {
      console.error('Share failed:', e)
    }
  }

  const handleJoin = async () => {
    if (isJoined) return
    try {
      setJoinLoading(true)
      const res = await axios.post(
        `https://sfcollab-backend.onrender.com/api/startup/${startupId}/join-request`,
        { message: 'Hi, I would like to join.', role: 'member' },
        { withCredentials: true }
      )
      setJoinMessage(res.data.message)
      setIsJoined(true)
      setJoinLoading(false)
    } catch (err) {
      console.error('Join request failed:', err)
      setJoinMessage(err.response?.data?.message || 'Failed to send join request')
      setJoinLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading startup details...</p>
      </div>
    )
  }

  if (error || !startupDetails) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 text-center">
        <p className="mb-4">{error || 'Startup not found'}</p>
        <Link to="/startup" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
          Back to Startups
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <div className="border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 flex justify-between items-center">
          <Link to="/startup" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="hidden sm:inline">Back to Startups</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2.5 rounded-xl border border-white/20 hover:bg-white/10" onClick={handleShare}>
              <Share2 className="h-5 w-5" />
            </button>
            <button
              className={`p-2.5 rounded-xl border border-white/20 ${
                isBookmarked ? 'bg-blue-500/10 text-blue-400 border-blue-400' : 'hover:bg-white/10'
              }`}
              onClick={handleBookmark}
            >
              <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-8">
          {/* Startup Header */}
          <div className="bg-[#1A1A1A] rounded-2xl sm:rounded-4xl p-4 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-0 mb-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden bg-zinc-700">
                  <img src={startupDetails.logo || allimg.profileImg} alt={startupDetails.name} className="h-full w-full object-cover" />
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-xl sm:text-2xl font-bold mb-2">{startupDetails.name}</h1>
                  <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-3">
                    <span className="bg-blue-600 text-white text-xs sm:text-sm px-3 py-1 rounded-full">{startupDetails.industry}</span>
                    <span className="bg-green-600 text-white text-xs sm:text-sm px-3 py-1 rounded-full">{startupDetails.stage}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleJoin}
                disabled={joinLoading || isJoined}
                className={`px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base ${
                  isJoined ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isJoined ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" /> Joined
                  </span>
                ) : joinLoading ? (
                  'Joining...'
                ) : (
                  'Join Startup'
                )}
              </button>
            </div>

            {joinMessage && <p className="text-green-400 text-sm sm:text-base mb-4">{joinMessage}</p>}
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">{startupDetails.description}</p>

            {/* Metrics, Team, Milestones, Feedback... */}
            {/* You can keep all your previous rendering for these sections here */}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 sm:space-y-8">
          <div className="bg-[#1A1A1A] rounded-2xl sm:rounded-4xl p-4 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Quick Info</h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between"><span className="text-gray-400 text-sm sm:text-base">Status</span><span className="text-green-500 text-sm sm:text-base">Active</span></div>
              <div className="flex justify-between"><span className="text-gray-400 text-sm sm:text-base">Founded</span><span className="text-sm sm:text-base">{startupDetails.founded}</span></div>
              <div className="flex justify-between"><span className="text-gray-400 text-sm sm:text-base">Location</span><span className="text-sm sm:text-base">{startupDetails.location}</span></div>
              <div className="flex justify-between"><span className="text-gray-400 text-sm sm:text-base">Team Size</span><span className="text-sm sm:text-base">{startupDetails.teamSize}</span></div>
              <div className="flex justify-between"><span className="text-gray-400 text-sm sm:text-base">Funding</span><span className="text-sm sm:text-base">{startupDetails.funding}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StartUpdetails
