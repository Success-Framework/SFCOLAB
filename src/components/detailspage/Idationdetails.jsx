import React, { useState } from "react";
import {
  ArrowLeft,
  Share2,
  Bookmark,
  MessageSquare,
  Heart,
  Users,
  Calendar,
  Clock,
  Send,
  Image as ImageIcon,
  Link as LinkIcon,
  Eye,
  TrendingUp,
  Star,
  CheckCircle,
  Plus,
  MoreHorizontal,
  Flag,
  Edit,
  Lightbulb,
  Target,
  Zap,
  Award,
  ThumbsUp,
  MessageCircle,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

const Idationdetails = () => {
  const [comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  const ideaDetails = {
    id: 1,
    title: "Smart Parenting Assistant",
    description: `A comprehensive mobile application designed to help parents manage their daily family activities, track children's development, and connect with other parents in their community. The app will feature AI-powered suggestions for age-appropriate activities, meal planning, and educational content.`,
    longDescription: `This innovative app addresses the growing need for digital parenting solutions in today's fast-paced world. Key features include:

• AI-powered activity recommendations based on child's age and interests
• Development milestone tracking with pediatric insights
• Community forum for parent-to-parent support and advice
• Integrated calendar for family scheduling and appointments
• Educational content library curated by child development experts
• Safety features including emergency contacts and location sharing

The app aims to reduce parenting stress while promoting healthy child development through evidence-based recommendations and community support.`,
    category: "Technology",
    stage: "Idea Stage",
    createdAt: "March 15, 2024",
    timeAgo: "2 hours ago",
    author: {
      name: "Sarah Johnson",
      role: "Product Designer",
      avatar: "https://i.pravatar.cc/150?img=5",
      reputation: 4.8,
      badges: ["🏆", "💡", "🎨"],
      bio: "Passionate product designer with 8+ years in family-focused tech solutions.",
      followers: 1247,
      projects: 23,
    },
    tags: ["Parenting", "Mobile App", "AI", "Education", "Community", "Health"],
    metrics: {
      likes: 67,
      hearts: 34,
      comments: 18,
      views: 892,
      shares: 15,
      bookmarks: 43,
      viability: "85%",
      timeline: "6 months",
      impact: "High",
      complexity: "Medium",
    },
    trendingScore: 89,
    featured: true,
    collaborators: [
      {
        id: 1,
        name: "Mike Chen",
        role: "Developer",
        avatar: "https://i.pravatar.cc/150?img=1",
        skills: ["React Native", "Node.js", "AI/ML"],
        joinedAt: "2 days ago",
      },
      {
        id: 2,
        name: "Emma Davis",
        role: "UX Researcher",
        avatar: "https://i.pravatar.cc/150?img=2",
        skills: ["User Research", "Prototyping", "Analytics"],
        joinedAt: "1 day ago",
      },
      {
        id: 3,
        name: "Alex Wong",
        role: "Business Analyst",
        avatar: "https://i.pravatar.cc/150?img=3",
        skills: ["Market Research", "Strategy", "Finance"],
        joinedAt: "4 hours ago",
      },
    ],
    feedback: [
      {
        id: 1,
        user: {
          name: "David Miller",
          avatar: "https://i.pravatar.cc/150?img=4",
          role: "Parent & Tech Enthusiast",
          verified: true,
        },
        comment:
          "Brilliant idea! As a parent of two, I can definitely see the value. Consider adding a feature for tracking children's health records and vaccination schedules. This could be a game-changer for busy parents.",
        timestamp: "2 hours ago",
        likes: 12,
        replies: 3,
        helpful: true,
      },
      {
        id: 2,
        user: {
          name: "Lisa Park",
          avatar: "https://i.pravatar.cc/150?img=6",
          role: "Pediatric Nurse",
          verified: true,
        },
        comment:
          "Love the concept! Would be amazing to see integration with popular calendar apps and the ability to share schedules with family members. Also, maybe partner with pediatricians for expert content validation?",
        timestamp: "5 hours ago",
        likes: 8,
        replies: 2,
        helpful: true,
      },
      {
        id: 3,
        user: {
          name: "John Rodriguez",
          avatar: "https://i.pravatar.cc/150?img=7",
          role: "Mobile Developer",
          verified: false,
        },
        comment:
          "Great idea! I'd love to contribute to the development. Have you considered the technical architecture? React Native could be perfect for this cross-platform solution.",
        timestamp: "1 day ago",
        likes: 5,
        replies: 1,
        helpful: false,
      },
    ],
  };

  const handleJoinProject = () => {
    setShowJoinModal(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Enhanced Header */}
      <div className="border-b border-white/10 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/ideation"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Ideas</span>
            </Link>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                  isLiked
                    ? "bg-red-500/20 text-red-400"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                <span>
                  {ideaDetails.metrics.likes + ideaDetails.metrics.hearts}
                </span>
              </button>
              <button className="p-2.5 hover:bg-white/10 rounded-xl transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2.5 rounded-xl transition-colors ${
                  isBookmarked
                    ? "bg-blue-500/20 text-blue-400"
                    : "hover:bg-white/10"
                }`}
              >
                <Bookmark
                  className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`}
                />
              </button>
              <button className="p-2.5 hover:bg-white/10 rounded-xl transition-colors">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#151515] border border-white/10 rounded-2xl p-8 relative overflow-hidden">
              {/* Featured Badge */}
              {ideaDetails.featured && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1 font-medium">
                  <Star className="h-3 w-3" />
                  Featured
                </div>
              )}

              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-xl">
                      <Lightbulb className="h-5 w-5 text-white" />
                    </div>
                    <span className="bg-blue-500 text-white text-sm px-3 py-1.5 font-medium rounded-full">
                      {ideaDetails.stage}
                    </span>
                    <div className="flex items-center gap-1 text-green-400 text-sm">
                      <TrendingUp className="h-4 w-4" />
                      <span>Trending #{ideaDetails.trendingScore}</span>
                    </div>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                    {ideaDetails.title}
                  </h1>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {ideaDetails.description}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {ideaDetails.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-white/10 hover:bg-white/20 text-sm px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-red-400">
                    {ideaDetails.metrics.likes + ideaDetails.metrics.hearts}
                  </div>
                  <div className="text-xs text-gray-400">Likes</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {ideaDetails.metrics.comments}
                  </div>
                  <div className="text-xs text-gray-400">Comments</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {ideaDetails.metrics.views}
                  </div>
                  <div className="text-xs text-gray-400">Views</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">
                    {ideaDetails.collaborators.length}
                  </div>
                  <div className="text-xs text-gray-400">Team</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleJoinProject}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2"
                >
                  <Plus className="h-5 w-5" />
                  Join Project
                </button>
                <button className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Start Discussion
                </button>
                <button className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2">
                  <Flag className="h-5 w-5" />
                  Suggest Improvement
                </button>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Target className="h-6 w-6 text-blue-400" />
                Project Details
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {ideaDetails.longDescription}
                </p>
              </div>
            </div>

            {/* Enhanced Comments Section */}
            <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <MessageCircle className="h-6 w-6 text-green-400" />
                  Discussion ({ideaDetails.feedback.length})
                </h2>
                <div className="flex gap-2">
                  <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition-colors">
                    Newest
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition-colors">
                    Most Helpful
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {ideaDetails.feedback.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex gap-4">
                      <div className="relative">
                        <img
                          src={item.user.avatar}
                          alt={item.user.name}
                          className="w-12 h-12 rounded-full border-2 border-white/20"
                        />
                        {item.user.verified && (
                          <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                            <CheckCircle className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{item.user.name}</h3>
                            <span className="text-sm text-gray-400">•</span>
                            <span className="text-sm text-gray-400">
                              {item.user.role}
                            </span>
                            {item.helpful && (
                              <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Award className="h-3 w-3" />
                                Helpful
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-400">
                            {item.timestamp}
                          </span>
                        </div>
                        <p className="text-gray-300 mb-4 leading-relaxed">
                          {item.comment}
                        </p>
                        <div className="flex items-center gap-6 text-gray-400">
                          <button className="flex items-center gap-1 hover:text-white transition-colors">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{item.likes}</span>
                          </button>
                          <button className="hover:text-white transition-colors">
                            Reply ({item.replies})
                          </button>
                          <button className="hover:text-white transition-colors">
                            Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Comment Input */}
              <div className="mt-8">
                <h3 className="font-semibold mb-4">Add your thoughts</h3>
                <div className="flex gap-4">
                  <img
                    src={ideaDetails.author.avatar}
                    alt="Your avatar"
                    className="w-12 h-12 rounded-full border-2 border-white/20"
                  />
                  <div className="flex-1">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your feedback, suggestions, or questions..."
                      className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                      rows="4"
                    />
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                          <ImageIcon className="h-5 w-5" />
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                          <LinkIcon className="h-5 w-5" />
                        </button>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2 font-medium">
                        <Send className="h-4 w-4" />
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Author Card */}
            <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-blue-400" />
                Idea Creator
              </h2>
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <img
                    src={ideaDetails.author.avatar}
                    alt={ideaDetails.author.name}
                    className="w-20 h-20 rounded-full border-3 border-white/20 mx-auto"
                  />
                  <div className="absolute -bottom-1 -right-1 flex gap-1">
                    {ideaDetails.author.badges.map((badge, index) => (
                      <span key={index} className="text-sm">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-1">
                  {ideaDetails.author.name}
                </h3>
                <p className="text-gray-400 mb-2">{ideaDetails.author.role}</p>
                <div className="flex items-center justify-center gap-1 text-yellow-400 mb-3">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-medium">
                    {ideaDetails.author.reputation}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  {ideaDetails.author.bio}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-blue-400">
                      {ideaDetails.author.followers}
                    </div>
                    <div className="text-gray-400">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-green-400">
                      {ideaDetails.author.projects}
                    </div>
                    <div className="text-gray-400">Projects</div>
                  </div>
                </div>
                <button className="w-full bg-white/10 hover:bg-white/20 py-2.5 rounded-xl transition-colors font-medium">
                  View Profile
                </button>
              </div>
            </div>

            {/* Project Team */}
            <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-400" />
                  Team ({ideaDetails.collaborators.length})
                </h2>
                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {ideaDetails.collaborators.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-full border-2 border-white/20"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{member.name}</h3>
                      <p className="text-gray-400 text-sm truncate">
                        {member.role}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {member.skills.slice(0, 2).map((skill, index) => (
                          <span
                            key={index}
                            className="bg-blue-500/20 text-blue-300 text-xs px-2 py-0.5 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                        {member.skills.length > 2 && (
                          <span className="text-gray-400 text-xs">
                            +{member.skills.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={handleJoinProject}
                className="w-full mt-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 py-2.5 rounded-xl transition-all duration-200 font-medium flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Join Team
              </button>
            </div>

            {/* Project Metrics */}
            <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Project Stats
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Viability Score</span>
                  <span className="font-bold text-green-400">
                    {ideaDetails.metrics.viability}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Timeline</span>
                  <span className="font-medium">
                    {ideaDetails.metrics.timeline}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Impact Level</span>
                  <span className="font-medium text-orange-400">
                    {ideaDetails.metrics.impact}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Complexity</span>
                  <span className="font-medium text-blue-400">
                    {ideaDetails.metrics.complexity}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Category</span>
                  <span className="font-medium">{ideaDetails.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Created</span>
                  <span className="font-medium">{ideaDetails.timeAgo}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Join Project Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1A1A] border border-white/20 rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Join Smart Parenting Assistant
            </h2>
            <p className="text-gray-300 mb-6">
              Express your interest to collaborate on this exciting project. The
              team will review your profile and get back to you.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowJoinModal(false)}
                className="flex-1 bg-white/10 hover:bg-white/20 py-3 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowJoinModal(false)}
                className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-xl transition-colors font-medium"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Idationdetails;
