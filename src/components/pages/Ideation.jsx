import {
  MessageSquare,
  ThumbsUp,
  Users,
  Calendar,
  ArrowUpRight,
  TrendingUp,
  Lightbulb,
  Star,
  Eye,
  Clock,
  Share2,
  Bookmark,
  Heart,
  MessageCircle,
  User,
  Trophy,
  Zap,
  Plus,
  Tag,
  WifiOff,
  RefreshCw,
} from "lucide-react";
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import IdeationHeader from "../headers/IdeationHeader";
import ScrollToTop from "../sections/ScrollToTop";

const BASE_URL = "https://sfcolab-backend.onrender.com";
const IDEATION_ENDPOINT = "/api/ideation";

const Ideation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState("All Stages");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [sortBy, setSortBy] = useState("trending");
  const [bookmarkNotification, setBookmarkNotification] = useState("");
  const [showShareMsg, setShowShareMsg] = useState(false);
  const [ideas, setIdeas] = useState([]);
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [networkError, setNetworkError] = useState(false);

  // Load ideas on mount
  useEffect(() => {
    fetchIdeas();
  }, []);

  // Fetch ideas from API
  const fetchIdeas = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setNetworkError(false);

      const response = await fetch(
        `${BASE_URL}${IDEATION_ENDPOINT}?page=1&limit=20&category=${
          selectedIndustry === "All Industries" ? "" : selectedIndustry
        }&search=${searchQuery || ""}&sortBy=${
          sortBy === "trending" ? "likes" : sortBy
        }&sortOrder=desc`
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();

      const mappedIdeas = data.ideas.map((idea) => ({
        id: idea._id,
        title: idea.title,
        description: idea.description || "No description available.",
        stage: idea.stage,
        category: idea.category,
        author: {
          name: `${idea.creator.firstName} ${idea.creator.lastName}`,
          role: idea.creator.position || "Contributor",
          avatar: idea.creator.avatar || "https://i.pravatar.cc/150?img=11",
        },
        createdAt: new Date(idea.createdAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        timeAgo: calculateTimeAgo(idea.createdAt),
        likes: idea.likes || 0,
        comments: idea.comments || 0,
        collaborators: idea.collaborators || 1,
        tags: Array.isArray(idea.tags)
          ? idea.tags
          : typeof idea.tags === "string"
          ? [idea.tags]
          : [],
      }));

      setIdeas(mappedIdeas);
    } catch (err) {
      console.error("Fetch error:", err);
      setNetworkError(true);
      setError("Unable to connect to the server.");
      setIdeas([]); // clear list if fetch fails
    } finally {
      setIsLoading(false);
    }
  };

  // Recalculate timeAgo for display
  const calculateTimeAgo = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now - created;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 24)
      return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  };

  // Handle create idea
  const handleCreateIdea = async (payload) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Unauthorized: No token found");
      }

      const response = await fetch(`${BASE_URL}${IDEATION_ENDPOINT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: payload.title,
          description: payload.description,
          projectDetails: payload.projectDetails || "",
          industry: payload.industry,
          stage: payload.stage,
          teamMembers: payload.teamMembers || [],
          tags: payload.tags || [],
        }),
      });

      if (!response.ok) {
        if (response.status === 401)
          throw new Error("Unauthorized: Invalid token");
        throw new Error("Failed to create idea");
      }

      const newIdea = await response.json();

      const formattedIdea = {
        ...newIdea,
        author: {
          name: "You",
          role: "Contributor",
          avatar: "https://i.pravatar.cc/150?img=11",
        },
        timeAgo: "just now",
        createdAt: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        likes: 0,
        comments: 0,
        collaborators: 1,
      };

      setIdeas((prev) => [formattedIdea, ...prev]);
      setSortBy("latest");
      setSearchQuery("");
    } catch (err) {
      console.error("Failed to create idea:", err);
      setError(err.message || "Failed to create idea. Please try again.");
    }
  };

  // Update filters and refetch
  useEffect(() => {
    fetchIdeas();
  }, [selectedStage, selectedIndustry, sortBy, searchQuery]);

  const getStageColor = (stage) => {
    const colors = {
      "Idea Stage": "bg-blue-500/20 text-blue-400",
      "Concept Stage": "bg-amber-500/20 text-amber-400",
      "Development Stage": "bg-green-500/20 text-green-400",
      "Research Stage": "bg-purple-500/20 text-purple-400",
      "MVP Stage": "bg-red-500/20 text-red-400",
    };
    return colors[stage] || "bg-gray-500/20 text-gray-400";
  };

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = ideas.filter((project) => {
      const searchLower = (searchQuery || "").toLowerCase();

      const matchesSearch =
        !searchQuery ||
        (project.title && project.title.toLowerCase().includes(searchLower)) ||
        (project.description &&
          project.description.toLowerCase().includes(searchLower)) ||
        (project.category &&
          project.category.toLowerCase().includes(searchLower)) ||
        (project.stage && project.stage.toLowerCase().includes(searchLower)) ||
        (project.author?.name &&
          project.author.name.toLowerCase().includes(searchLower)) ||
        (Array.isArray(project.tags) &&
          project.tags.some(
            (tag) => tag && tag.toLowerCase().includes(searchLower)
          ));

      const matchesStage =
        selectedStage === "All Stages" || project.stage === selectedStage;

      const matchesIndustry =
        selectedIndustry === "All Industries" ||
        project.category === selectedIndustry;

      return matchesSearch && matchesStage && matchesIndustry;
    });

    switch (sortBy) {
      case "trending":
        return filtered.sort(
          (a, b) => b.likes + b.comments - (a.likes + a.comments)
        );
      case "latest":
        return filtered.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "popular":
        return filtered.sort((a, b) => b.likes - a.likes);
      case "discussed":
        return filtered.sort((a, b) => b.comments - a.comments);
      default:
        return filtered;
    }
  }, [ideas, searchQuery, selectedStage, selectedIndustry, sortBy]);

  const handleBookmark = (idea) => {
    const id = idea.id;
    setBookmarkedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
        setBookmarkNotification("Bookmark removed");
      } else {
        newSet.add(id);
        setBookmarkNotification("Idea bookmarked!");
      }
      setTimeout(() => setBookmarkNotification(""), 2000);
      return newSet;
    });
  };

  const handleShare = async (idea) => {
    try {
      const url = `${window.location.origin}/ideation-details?id=${idea.id}`;
      const title = idea.title;
      if (navigator.share) {
        await navigator.share({
          title: title,
          url: url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setShowShareMsg(true);
        setTimeout(() => setShowShareMsg(false), 1500);
      }
    } catch (e) {
      setShowShareMsg(true);
      setTimeout(() => setShowShareMsg(false), 1500);
    }
  };

  const handleRetry = () => {
    fetchIdeas();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gray-300">Loading ideas...</p>
      </div>
    );
  }

  if (networkError) {
    return (
      <div className="min-h-screen bg-black">
        <IdeationHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedStage={selectedStage}
          setSelectedStage={setSelectedStage}
          selectedIndustry={selectedIndustry}
          setSelectedIndustry={setSelectedIndustry}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onCreateIdea={handleCreateIdea}
        />
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="bg-[#1A1A1A] rounded-2xl p-8 max-w-md w-full text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-red-500/20 p-4 rounded-full">
                <WifiOff className="h-8 w-8 text-red-500" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              Network Connection Issue
            </h3>
            <p className="text-gray-400 mb-6">
              {error ||
                "Unable to connect to the server. Please check your internet connection."}
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleRetry}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="mb-0">
        <IdeationHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedStage={selectedStage}
          setSelectedStage={setSelectedStage}
          selectedIndustry={selectedIndustry}
          setSelectedIndustry={setSelectedIndustry}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onCreateIdea={handleCreateIdea}
        />
      </div>

      {error && !networkError && (
        <div className="mx-4 mt-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2 text-yellow-400">
            <WifiOff className="h-4 w-4" />
            <span className="text-sm">{error}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 max-sm:p-2">
        {filteredAndSortedProjects.map((content) => (
          <div key={content.id} className="group relative">
            <Link
              to={`/ideation-details?id=${content.id}`}
              className="block bg-[#1A1A1A] border border-white/10 rounded-xl hover:border-white/20 hover:bg-[#212121] transition-all duration-300 group-hover:scale-[1.02] h-full"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={content.author.avatar}
                      alt={content.author.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-sm text-white">
                        {content.author.name}
                      </h3>
                      <p className="text-xs text-gray-400">
                        {content.author.role}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`${getStageColor(
                      content.stage
                    )} text-xs px-2 py-1 rounded-full font-medium`}
                  >
                    {content.stage}
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-white leading-tight line-clamp-2">
                    {content.title}
                  </h2>
                  <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
                    {content.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {Array.isArray(content.tags) &&
                    content.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-white/5 text-gray-300 text-xs px-2 py-1 rounded-md hover:bg-white/10 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}

                  {Array.isArray(content.tags) && content.tags.length > 3 && (
                    <span className="text-gray-400 text-xs px-2 py-1">
                      +{content.tags.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {content.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      {content.comments}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {content.collaborators}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {content.timeAgo}
                  </span>
                </div>

                <div className="flex items-center justify-center pt-2">
                  <span className="text-blue-400 text-sm font-medium flex items-center gap-1 group-hover:text-blue-300 transition-colors">
                    <MessageSquare className="h-4 w-4" />
                    Join Discussion
                  </span>
                </div>
              </div>
            </Link>

            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                className={`bg-white/20 p-2 rounded-lg transition-colors ${
                  bookmarkedIds.has(content.id)
                    ? "bg-blue-500/10 text-blue-400 border border-blue-400"
                    : "hover:bg-white/30"
                }`}
                onClick={() => handleBookmark(content)}
              >
                <Bookmark
                  className={`h-4 w-4 ${
                    bookmarkedIds.has(content.id)
                      ? "text-blue-400 fill-current"
                      : "text-white"
                  }`}
                />
              </button>
              <button
                className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors"
                onClick={() => handleShare(content)}
              >
                <Share2 className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedProjects.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="text-center space-y-4">
            <Lightbulb className="h-16 w-16 text-gray-600 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-300">
              No ideas found
            </h3>
            <p className="text-gray-500 max-w-md">
              Be the first to share an innovative idea! Try adjusting your
              filters or create a new idea to get the conversation started.
            </p>
            <button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Share Your Idea
            </button>
          </div>
        </div>
      )}

      <ScrollToTop />

      {bookmarkNotification && (
        <div className="fixed bottom-4 right-4 bg-[#232323] text-green-400 px-4 py-2 rounded shadow-lg border border-green-700 z-50">
          {bookmarkNotification}
        </div>
      )}

      {showShareMsg && (
        <div className="fixed bottom-4 left-4 bg-[#232323] text-green-400 px-4 py-2 rounded shadow-lg border border-green-700 z-50">
          Link copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default Ideation;
