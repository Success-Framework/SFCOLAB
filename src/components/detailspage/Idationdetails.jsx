import React, { useState, useRef } from "react";
import {
  ArrowLeft,
  MessageSquare,
  Heart,
  Users,
  Clock,
  Send,
  Bookmark,
  Share2,
  Tag,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const Idationdetails = () => {
  const [comment, setComment] = useState("");
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showSuggestModal, setShowSuggestModal] = useState(false);
  const [joinMessage, setJoinMessage] = useState("");
  const [suggestMessage, setSuggestMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(101);
  const [bookmarked, setBookmarked] = useState(false);
  const [showShareMsg, setShowShareMsg] = useState(false);
  const commentInputRef = useRef(null);
  const discussionSectionRef = useRef(null);

  const ideaDetails = {
    id: 1,
    title: "Smart Parenting Assistant",
    description:
      "A comprehensive mobile application designed to help parents manage their daily family activities, track children's development, and connect with other parents in their community. The app will feature AI-powered suggestions for age-appropriate activities, meal planning, and educational content.",
    longDescription:
      "This innovative app addresses the growing need for digital parenting solutions in today's fast-paced world. Key features include: \n\n• AI-powered activity recommendations based on child's age and interests\n• Development milestone tracking with pediatric insights\n• Community forum for parent-to-parent support and advice\n• Integrated calendar for family scheduling and appointments\n• Educational content library curated by child development experts\n• Safety features including emergency contacts and location sharing\n\nThe app aims to reduce parenting stress while promoting healthy child development through evidence-based recommendations and community support.",
    stage: "Idea Stage",
    createdAt: "March 15, 2024",
    timeAgo: "2 hours ago",
    tags: ["Parenting", "Mobile App", "AI", "Education", "Community", "Health"],
    comments: 18,
    views: 892,
    collaborators: 3,
    author: {
      name: "Sarah Johnson",
      role: "Product Designer",
      avatar: "https://i.pravatar.cc/150?img=5",
      bio: "Passionate product designer with 8+ years in family-focused tech solutions.",
    },
    team: [
      {
        name: "Mike Chen",
        role: "Developer",
        avatar: "https://i.pravatar.cc/150?img=1",
        skills: ["React Native", "Node.js"],
      },
      {
        name: "Emma Davis",
        role: "UX Researcher",
        avatar: "https://i.pravatar.cc/150?img=2",
        skills: ["User Research", "Prototyping"],
      },
      {
        name: "Alex Wong",
        role: "Business Analyst",
        avatar: "https://i.pravatar.cc/150?img=3",
        skills: ["Market Research", "Strategy"],
      },
    ],
    feedback: [
      {
        id: 1,
        user: {
          name: "David Miller",
          avatar: "https://i.pravatar.cc/150?img=4",
          role: "Parent & Tech Enthusiast",
        },
        comment:
          "Brilliant idea! As a parent of two, I can definitely see the value. Consider adding a feature for tracking children's health records and vaccination schedules.",
        timestamp: "2 hours ago",
        likes: 5,
      },
      {
        id: 2,
        user: {
          name: "Lisa Park",
          avatar: "https://i.pravatar.cc/150?img=6",
          role: "Pediatric Nurse",
        },
        comment:
          "Would love to see integration with popular calendar apps and the ability to share schedules with family members.",
        timestamp: "5 hours ago",
        likes: 3,
      },
    ],
  };

  // Button handlers
  const handleJoinProject = () => {
    setShowJoinModal(true);
    setSuccessMsg("");
  };
  const handleSuggestImprovement = () => {
    setShowSuggestModal(true);
    setSuccessMsg("");
  };
  const handleStartDiscussion = () => {
    if (discussionSectionRef.current) {
      discussionSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setTimeout(() => {
      if (commentInputRef.current) {
        commentInputRef.current.focus();
      }
    }, 400);
  };
  const handleJoinSubmit = (e) => {
    e.preventDefault();
    setSuccessMsg("Request sent! The team will review your interest.");
    setJoinMessage("");
    setTimeout(() => setShowJoinModal(false), 1200);
  };
  const handleSuggestSubmit = (e) => {
    e.preventDefault();
    setSuccessMsg("Thank you for your suggestion!");
    setSuggestMessage("");
    setTimeout(() => setShowSuggestModal(false), 1200);
  };
  const handleLike = () => {
    setLiked((prev) => {
      const newLiked = !prev;
      setLikeCount((count) => count + (newLiked ? 1 : -1));
      return newLiked;
    });
  };
  const handleBookmark = () => {
    setBookmarked((prev) => !prev);
  };
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: ideaDetails.title,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShowShareMsg(true);
        setTimeout(() => setShowShareMsg(false), 1500);
      }
    } catch (e) {
      setShowShareMsg(true);
      setTimeout(() => setShowShareMsg(false), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-4 py-4 border">
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
                className={`p-2.5 rounded-xl transition-colors flex items-center gap-1 border border-white/20 ${
                  liked
                    ? "bg-red-500/10 text-red-400 border-red-400"
                    : "hover:bg-white/10"
                }`}
                onClick={handleLike}
                aria-label="Like"
              >
                <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
                <span
                  className="text-xs font-medium"
                  style={{ minWidth: 24, textAlign: "center" }}
                >
                  {likeCount}
                </span>
              </button>
              <button
                className="p-2.5 rounded-xl transition-colors border border-white/20 hover:bg-white/10"
                onClick={handleShare}
                aria-label="Share"
              >
                <Share2 className="h-5 w-5" />
              </button>
              <button
                className={`p-2.5 rounded-xl transition-colors border border-white/20 ${
                  bookmarked
                    ? "bg-blue-500/10 text-blue-400 border-blue-400"
                    : "hover:bg-white/10"
                }`}
                onClick={handleBookmark}
                aria-label="Bookmark"
              >
                <Bookmark
                  className={`h-5 w-5 ${bookmarked ? "fill-current" : ""}`}
                />
              </button>
            </div>
          </div>
          {showShareMsg && (
            <div className="absolute right-8 top-16 bg-[#232323] text-xs text-green-400 px-4 py-2 rounded shadow-lg border border-green-700 z-50">
              Link copied!
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Idea Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#18181A] rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-500/20 text-blue-400 text-xs px-3 py-1 rounded-full font-medium">
                {ideaDetails.stage}
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Clock className="h-3 w-3" /> {ideaDetails.timeAgo}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">
              {ideaDetails.title}
            </h1>
            <p className="text-gray-300 text-base mb-4">
              {ideaDetails.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {ideaDetails.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-white/5 text-gray-300 text-xs px-2 py-1 rounded-md hover:bg-white/10 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-6 text-xs text-gray-400 mb-4">
              <span className="flex items-center gap-1">
                <Heart className="h-4 w-4" /> {ideaDetails.likes} Likes
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" /> {ideaDetails.comments}{" "}
                Comments
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" /> {ideaDetails.collaborators} Team
              </span>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-medium transition-colors"
                onClick={handleJoinProject}
              >
                + Join Project
              </button>
              <button
                className="bg-white/10 hover:bg-white/20 px-5 py-2 rounded-lg font-medium transition-colors"
                onClick={handleStartDiscussion}
              >
                Start Discussion
              </button>
              <button
                className="bg-white/10 hover:bg-white/20 px-5 py-2 rounded-lg font-medium transition-colors"
                onClick={handleSuggestImprovement}
              >
                Suggest Improvement
              </button>
            </div>
          </div>

          {/* Project Details */}
          <div className="bg-[#18181A] rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Tag className="h-5 w-5 text-blue-400" /> Project Details
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {ideaDetails.longDescription}
              </p>
            </div>
          </div>

          {/* Discussion Section */}
          <div
            className="bg-[#18181A] rounded-2xl p-8"
            ref={discussionSectionRef}
          >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-green-400" /> Discussion (
              {ideaDetails.feedback.length})
            </h2>
            <div className="space-y-6">
              {ideaDetails.feedback.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.user.avatar}
                    alt={item.user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{item.user.name}</h3>
                        <span className="text-xs text-gray-400">
                          {item.user.role}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-2">{item.comment}</p>
                    <div className="flex items-center gap-4 text-gray-400">
                      <button className="flex items-center gap-1 hover:text-white transition-colors">
                        <Heart className="h-4 w-4" /> {item.likes}
                      </button>
                      <button className="hover:text-white transition-colors">
                        Reply
                      </button>
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
                    ref={commentInputRef}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add your comment..."
                    className="w-full bg-[#232323] rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                  <div className="flex items-center justify-end mt-2">
                    <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium">
                      <Send className="h-4 w-4" /> Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8 max-w-2xl">
          {/* Author Card */}
          <div className="bg-[#18181A] rounded-2xl p-6 text-center">
            <h2 className="text-lg font-bold mb-4">Idea Creator</h2>
            <img
              src={ideaDetails.author.avatar}
              alt={ideaDetails.author.name}
              className="w-16 h-16 rounded-full mx-auto mb-2"
            />
            <h3 className="font-semibold text-base">
              {ideaDetails.author.name}
            </h3>
            <p className="text-xs text-gray-400 mb-2">
              {ideaDetails.author.role}
            </p>
            <p className="text-xs text-gray-300 mb-4">
              {ideaDetails.author.bio}
            </p>
          </div>

          {/* Team Section */}
          <div className="bg-[#18181A] rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-4">
              Team ({ideaDetails.team.length})
            </h2>
            <div className="space-y-4">
              {ideaDetails.team.map((member, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-sm">{member.name}</h3>
                    <p className="text-xs text-gray-400">{member.role}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {member.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="bg-blue-500/20 text-blue-300 text-xs px-2 py-0.5 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 py-2.5 rounded-xl transition-colors font-medium flex items-center justify-center gap-2">
              + Join Team
            </button>
          </div>
        </div>
      </div>

      {/* Join Project Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1A1A] border border-white/20 rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Join Project</h2>
              <button
                onClick={() => setShowJoinModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {successMsg ? (
              <div className="text-green-400 text-center py-6">
                {successMsg}
              </div>
            ) : (
              <form onSubmit={handleJoinSubmit} className="space-y-4">
                <textarea
                  value={joinMessage}
                  onChange={(e) => setJoinMessage(e.target.value)}
                  placeholder="Tell the team why you want to join..."
                  className="w-full bg-[#232323] rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 py-2.5 rounded-xl font-medium"
                >
                  Send Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Suggest Improvement Modal */}
      {showSuggestModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1A1A] border border-white/20 rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Suggest Improvement</h2>
              <button
                onClick={() => setShowSuggestModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {successMsg ? (
              <div className="text-green-400 text-center py-6">
                {successMsg}
              </div>
            ) : (
              <form onSubmit={handleSuggestSubmit} className="space-y-4">
                <textarea
                  value={suggestMessage}
                  onChange={(e) => setSuggestMessage(e.target.value)}
                  placeholder="Share your suggestion for improvement..."
                  className="w-full bg-[#232323] rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 py-2.5 rounded-xl font-medium"
                >
                  Send Suggestion
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Idationdetails;
