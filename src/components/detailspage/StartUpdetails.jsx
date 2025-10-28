import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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
  Target,
} from "lucide-react";
import { allimg } from "../../utils";
import { useLocation } from "react-router-dom";

const StartUpdetails = () => {
  const [isJoined, setIsJoined] = useState(false);
  const [comment, setComment] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [joinLoading, setJoinLoading] = useState(false);
  const [joinMessage, setJoinMessage] = useState("");
  const [startupDetails, setStartupDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const startupId = queryParams.get("id");

  const bufferToBase64 = (imageObj) => {
    if (!imageObj || !imageObj.data || !imageObj.data.data) return null;
    const base64String = btoa(
      new Uint8Array(imageObj.data.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
    return `data:${imageObj.contentType};base64,${base64String}`;
  };

  // Fetch startup details from backend
  const fetchStartup = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");

      const res = await axios.get(
        `https://sfcolab-backend.onrender.com/api/startup/${startupId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const startup = res.data.startup; 

      const convertedStartup = {
        ...startup,
        logo:
          bufferToBase64(startup.logo) ||
          "https://via.placeholder.com/150?text=No+Logo",
        banner:
          bufferToBase64(startup.banner) ||
          "https://via.placeholder.com/600x200?text=No+Banner",
      };

      setStartupDetails(convertedStartup);
      setLoading(false);

      const isMember = startup.members?.some(
        (m) => m.userId === res.data.userId
      );
      setIsJoined(isMember);
    } catch (err) {
      console.error("Failed to fetch startup:", err);
      setError("Failed to fetch startup details");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (startupId) fetchStartup();
  }, [startupId]);

  const handleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  const handleShare = async () => {
    try {
      const url = `${window.location.origin}/startup-details?id=${startupId}`;
      if (navigator.share) {
        await navigator.share({
          title: startupDetails?.name || "Startup",
          url: url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      }
    } catch (e) {
      console.error("Share failed:", e);
    }
  };

  const handleJoin = async () => {
    if (isJoined) return;
    try {
      setJoinLoading(true);
      const token = localStorage.getItem("authToken");

      const res = await axios.post(
        `https://sfcolab-backend.onrender.com/api/startup/${startupId}/join-request`,
        {
          message: "Hi, I would like to join.",
          role: "member",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJoinMessage(res.data.message);
      setIsJoined(true);
    } catch (err) {
      console.error("Join request failed:", err);
      setJoinMessage(
        err.response?.data?.message || "Failed to send join request"
      );
    } finally {
      setJoinLoading(false);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      // Handle comment submission
      console.log("Comment submitted:", comment);
      setComment("");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading startup details...</p>
      </div>
    );
  }

  if (error || !startupDetails) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 text-center">
        <p className="mb-4">{error || "Startup not found"}</p>
        <Link
          to="/startup"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          Back to Startups
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <div className="border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <Link
              to="/startup"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Back to Startups</span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                className="p-2.5 rounded-xl transition-colors border border-white/20 hover:bg-white/10"
                onClick={handleShare}
                aria-label="Share"
              >
                <Share2 className="h-5 w-5" />
              </button>
              <button
                className={`p-2.5 rounded-xl transition-colors border border-white/20 ${
                  isBookmarked
                    ? "bg-blue-500/10 text-blue-400 border-blue-400"
                    : "hover:bg-white/10"
                }`}
                onClick={handleBookmark}
                aria-label="Bookmark"
              >
                <Bookmark
                  className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`}
                />
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
                    <img
                      src={startupDetails.logo || allimg.profileImg}
                      alt={startupDetails.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="text-center sm:text-left">
                    <h1 className="text-xl sm:text-2xl font-bold mb-2">
                      {startupDetails.name}
                    </h1>
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
                  onClick={handleJoin}
                  disabled={joinLoading || isJoined}
                  className={`px-4 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                    isJoined
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  } ${joinLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isJoined ? (
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
                      Joined
                    </span>
                  ) : joinLoading ? (
                    "Joining..."
                  ) : (
                    "Join Startup"
                  )}
                </button>
              </div>

              {joinMessage && (
                <p className="text-green-400 text-sm sm:text-base mb-4">
                  {joinMessage}
                </p>
              )}

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                {startupDetails.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-[#2A2A2A] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    <span className="text-xs sm:text-sm text-gray-400">
                      Location
                    </span>
                  </div>
                  <p className="font-medium text-sm sm:text-base">
                    {startupDetails.location}
                  </p>
                </div>
                <div className="bg-[#2A2A2A] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="h-5 w-5 text-blue-500" />
                    <span className="text-xs sm:text-sm text-gray-400">
                      Team Size
                    </span>
                  </div>
                  <p className="font-medium text-sm sm:text-base">
                    {startupDetails.memberCount}
                  </p>
                </div>
                <div className="bg-[#2A2A2A] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-5 w-5 text-blue-500" />
                    <span className="text-xs sm:text-sm text-gray-400">
                      Funding
                    </span>
                  </div>
                  <p className="font-medium text-sm sm:text-base">
                    {startupDetails.funding}
                  </p>
                </div>
                <div className="bg-[#2A2A2A] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    <span className="text-xs sm:text-sm text-gray-400">
                      Founded
                    </span>
                  </div>
                  <p className="font-medium text-sm sm:text-base">
                    {startupDetails.founded}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {startupDetails.website && (
                  <a
                    href={startupDetails.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-400 transition-colors text-sm sm:text-base"
                  >
                    Visit Website
                  </a>
                )}
                {startupDetails.social?.linkedin && (
                  <a
                    href={startupDetails.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-400 transition-colors text-sm sm:text-base"
                  >
                    LinkedIn
                  </a>
                )}
                {startupDetails.social?.twitter && (
                  <a
                    href={startupDetails.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-400 transition-colors text-sm sm:text-base"
                  >
                    Twitter
                  </a>
                )}
              </div>
            </div>

            {/* Key Metrics */}
            {startupDetails.metrics && (
              <div className="bg-[#1A1A1A] rounded-2xl sm:rounded-4xl p-4 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
                  Key Metrics
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  {startupDetails.metrics.users && (
                    <div className="bg-[#2A2A2A] rounded-xl p-4 sm:p-6 text-center">
                      <Target className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 mx-auto mb-2 sm:mb-3" />
                      <p className="text-xl sm:text-2xl font-bold mb-1">
                        {startupDetails.metrics.users}
                      </p>
                      <p className="text-gray-400 text-sm sm:text-base">
                        Active Users
                      </p>
                    </div>
                  )}
                  {startupDetails.metrics.accuracy && (
                    <div className="bg-[#2A2A2A] rounded-xl p-4 sm:p-6 text-center">
                      <Target className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 mx-auto mb-2 sm:mb-3" />
                      <p className="text-xl sm:text-2xl font-bold mb-1">
                        {startupDetails.metrics.accuracy}
                      </p>
                      <p className="text-gray-400 text-sm sm:text-base">
                        Diagnostic Accuracy
                      </p>
                    </div>
                  )}
                  {startupDetails.metrics.hospitals && (
                    <div className="bg-[#2A2A2A] rounded-xl p-4 sm:p-6 text-center">
                      <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500 mx-auto mb-2 sm:mb-3" />
                      <p className="text-xl sm:text-2xl font-bold mb-1">
                        {startupDetails.metrics.hospitals}
                      </p>
                      <p className="text-gray-400 text-sm sm:text-base">
                        Partner Hospitals
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Team */}
            {startupDetails.team && startupDetails.team.length > 0 && (
              <div className="bg-[#1A1A1A] rounded-2xl sm:rounded-4xl p-4 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
                  Team
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {startupDetails.team.map((member, index) => (
                    <div
                      key={index}
                      className="bg-[#2A2A2A] rounded-xl p-4 sm:p-6"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={member.avatar || allimg.profileImg}
                          alt={member.name}
                          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full"
                        />
                        <div>
                          <h3 className="font-medium text-sm sm:text-base">
                            {member.name}
                          </h3>
                          <p className="text-gray-400 text-xs sm:text-sm">
                            {member.role}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm sm:text-base">
                        {member.bio}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Milestones */}
            {startupDetails.milestones &&
              startupDetails.milestones.length > 0 && (
                <div className="bg-[#1A1A1A] rounded-2xl sm:rounded-4xl p-4 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
                    Milestones
                  </h2>
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
                            <span className="text-sm sm:text-base font-medium">
                              {milestone.date}
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm sm:text-base font-medium">
                              {milestone.title}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm sm:text-base">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Feedback */}
            {startupDetails.feedback && startupDetails.feedback.length > 0 && (
              <div className="bg-[#1A1A1A] rounded-2xl sm:rounded-4xl p-4 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
                  Feedback
                </h2>
                <div className="space-y-4">
                  {startupDetails.feedback.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#2A2A2A] rounded-xl p-4 sm:p-6"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <img
                          src={item.user.avatar || allimg.profileImg}
                          alt={item.user.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                        />
                        <div>
                          <h3 className="font-medium text-sm sm:text-base">
                            {item.user.name}
                          </h3>
                          <p className="text-gray-400 text-xs sm:text-sm">
                            {item.user.role}
                          </p>
                        </div>
                        <div className="ml-auto flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < item.rating
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm sm:text-base mb-2">
                        {item.comment}
                      </p>
                      <span className="text-gray-400 text-xs sm:text-sm">
                        {item.timestamp}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Comment Input Section */}
                <div className="mt-8 pt-6 border-t border-gray-700">
                  <h3 className="text-lg font-semibold mb-4">
                    Add Your Feedback
                  </h3>
                  <form onSubmit={handleCommentSubmit} className="space-y-4">
                    <div className="bg-[#2A2A2A] rounded-xl p-4">
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your thoughts about this startup..."
                        className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-white placeholder-gray-400 resize-none"
                        rows="4"
                      />
                      <div className="flex items-center justify-between pt-3 border-t border-gray-600">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="p-2 text-gray-400 hover:text-white"
                          >
                            <ImageIcon className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            className="p-2 text-gray-400 hover:text-white"
                          >
                            <LinkIcon className="h-5 w-5" />
                          </button>
                        </div>
                        <button
                          type="submit"
                          disabled={!comment.trim()}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg flex items-center gap-2"
                        >
                          <Send className="h-4 w-4" />
                          Post Feedback
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Quick Info */}
          <div className="space-y-4 sm:space-y-8">
            {/* Quick Info */}
            <div className="bg-[#1A1A1A] rounded-2xl sm:rounded-4xl p-4 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
                Quick Info
              </h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm sm:text-base">
                    Status
                  </span>
                  <span className="text-green-500 text-sm sm:text-base">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm sm:text-base">
                    Founded
                  </span>
                  <span className="text-sm sm:text-base">
                    {startupDetails.founded}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm sm:text-base">
                    Location
                  </span>
                  <span className="text-sm sm:text-base">
                    {startupDetails.location}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm sm:text-base">
                    Team Size
                  </span>
                  <span className="text-sm sm:text-base">
                    {startupDetails.memberCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm sm:text-base">
                    Funding
                  </span>
                  <span className="text-sm sm:text-base">
                    {startupDetails.funding}
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Info Card */}
            <div className="bg-[#1A1A1A] rounded-2xl sm:rounded-4xl p-4 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
                Additional Info
              </h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-500" />
                  <span className="text-sm sm:text-base">
                    {startupDetails.memberCount} Team Members
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-green-500" />
                  <span className="text-sm sm:text-base">
                    {startupDetails.industry} Industry
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-purple-500" />
                  <span className="text-sm sm:text-base">
                    Founded {startupDetails.founded}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm sm:text-base">
                    {startupDetails.stage} Stage
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartUpdetails;
