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
} from "lucide-react";
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import IdeationHeader from "../headers/IdeationHeader";
import Options from "../sections/Options";
import ScrollToTop from "../sections/ScrollToTop";

const Ideation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState("All Stages");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [sortBy, setSortBy] = useState("trending"); // trending, latest, popular, discussed

  const getStageColor = (stage) => {
    const colors = {
      "Idea Stage": "bg-blue-500",
      "Concept Stage": "bg-amber-500",
      "Development Stage": "bg-green-500",
      "Research Stage": "bg-purple-500",
      "MVP Stage": "bg-red-500",
    };
    return colors[stage] || "bg-gray-500";
  };

  const getEngagementLevel = (likes, comments) => {
    const total = likes + comments;
    if (total > 50) return { level: "High", color: "text-green-400" };
    if (total > 20) return { level: "Medium", color: "text-yellow-400" };
    return { level: "Low", color: "text-gray-400" };
  };

  const cardContent = [
    {
      id: 1,
      header: "Smart Parenting Assistant",
      content: `A comprehensive mobile application designed to help parents manage their daily family activities, track children's development, and connect with other parents in their community. The app would include features like milestone tracking, pediatrician appointment reminders, and a community forum for parents to share experiences.`,
      createdAt: "March 15, 2024",
      timeAgo: "2 hours ago",
      stage: "Idea Stage",
      category: "Technology",
      tags: ["Parenting", "Mobile App", "AI", "Community"],
      likes: 45,
      hearts: 23,
      comments: 12,
      views: 234,
      shares: 8,
      bookmarks: 15,
      collaborators: 8,
      trendingScore: 89,
      author: {
        name: "Sarah Johnson",
        role: "Product Designer",
        avatar: "https://i.pravatar.cc/150?img=5",
        reputation: 4.8,
        badges: ["🏆", "💡"],
      },
      metrics: {
        impact: "High",
        complexity: "Medium",
        timeline: "6 months",
        viability: "85%",
      },
      lastActivity: "2 hours ago",
      isHot: true,
      featured: false,
    },
    {
      id: 2,
      header: "Eco-Friendly Delivery Network",
      content: `A sustainable delivery service using electric vehicles and bicycles for last-mile delivery, reducing carbon emissions and promoting eco-friendly transportation solutions. The platform would connect eco-conscious consumers with green delivery options.`,
      createdAt: "March 14, 2024",
      timeAgo: "1 day ago",
      stage: "Concept Stage",
      category: "Sustainability",
      tags: ["Green Tech", "Logistics", "Transportation", "Environment"],
      likes: 67,
      hearts: 34,
      comments: 18,
      views: 456,
      shares: 12,
      bookmarks: 25,
      collaborators: 5,
      trendingScore: 92,
      author: {
        name: "Mike Chen",
        role: "Business Analyst",
        avatar: "https://i.pravatar.cc/150?img=1",
        reputation: 4.6,
        badges: ["🌱", "💼"],
      },
      metrics: {
        impact: "Very High",
        complexity: "High",
        timeline: "12 months",
        viability: "78%",
      },
      lastActivity: "4 hours ago",
      isHot: true,
      featured: true,
    },
    {
      id: 3,
      header: "Virtual Reality Education Platform",
      content: `An immersive learning platform that uses VR technology to create engaging educational experiences, making complex subjects more accessible and interactive for students of all ages.`,
      createdAt: "March 13, 2024",
      timeAgo: "2 days ago",
      stage: "Development Stage",
      category: "Education",
      tags: ["VR", "EdTech", "Learning", "Innovation"],
      likes: 38,
      hearts: 19,
      comments: 15,
      views: 312,
      shares: 6,
      bookmarks: 22,
      collaborators: 12,
      trendingScore: 76,
      author: {
        name: "Emma Davis",
        role: "UX Researcher",
        avatar: "https://i.pravatar.cc/150?img=2",
        reputation: 4.7,
        badges: ["🎓", "🚀"],
      },
      metrics: {
        impact: "High",
        complexity: "Very High",
        timeline: "9 months",
        viability: "72%",
      },
      lastActivity: "1 day ago",
      isHot: false,
      featured: false,
    },
    {
      id: 4,
      header: "AI-Powered Health Monitoring",
      content: `A wearable device that uses artificial intelligence to monitor vital signs and provide early warnings for potential health issues, helping users maintain better health and prevent medical emergencies.`,
      createdAt: "March 12, 2024",
      timeAgo: "3 days ago",
      stage: "Research Stage",
      category: "Healthcare",
      tags: ["AI", "Healthcare", "Wearables", "Prevention"],
      likes: 82,
      hearts: 41,
      comments: 23,
      views: 567,
      shares: 15,
      bookmarks: 32,
      collaborators: 15,
      trendingScore: 95,
      author: {
        name: "Alex Wong",
        role: "Tech Lead",
        avatar: "https://i.pravatar.cc/150?img=3",
        reputation: 4.9,
        badges: ["⚡", "🏥", "🏆"],
      },
      metrics: {
        impact: "Very High",
        complexity: "High",
        timeline: "18 months",
        viability: "68%",
      },
      lastActivity: "6 hours ago",
      isHot: true,
      featured: true,
    },
  ];

  // Enhanced filtering with sorting
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = cardContent.filter((project) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        project.header.toLowerCase().includes(searchLower) ||
        project.content.toLowerCase().includes(searchLower) ||
        project.category.toLowerCase().includes(searchLower) ||
        project.stage.toLowerCase().includes(searchLower) ||
        project.author.name.toLowerCase().includes(searchLower) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchLower));

      const matchesStage =
        selectedStage === "All Stages" || project.stage === selectedStage;

      const matchesIndustry =
        selectedIndustry === "All Industries" ||
        project.category === selectedIndustry;

      return matchesSearch && matchesStage && matchesIndustry;
    });

    // Sort based on selected criteria
    switch (sortBy) {
      case "trending":
        return filtered.sort((a, b) => b.trendingScore - a.trendingScore);
      case "latest":
        return filtered.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "popular":
        return filtered.sort(
          (a, b) => b.likes + b.hearts - (a.likes + a.hearts)
        );
      case "discussed":
        return filtered.sort((a, b) => b.comments - a.comments);
      default:
        return filtered;
    }
  }, [searchQuery, selectedStage, selectedIndustry, sortBy]);

  return (
    <div className="min-h-screen bg-black">
      <div className="mb-0">
        <Options />
        <IdeationHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedStage={selectedStage}
          setSelectedStage={setSelectedStage}
          selectedIndustry={selectedIndustry}
          setSelectedIndustry={setSelectedIndustry}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>

      {/* Community Stats Bar */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] rounded-xl p-4 border border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-blue-400">127</div>
              <div className="text-xs text-gray-400">Active Ideas</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-green-400">89</div>
              <div className="text-xs text-gray-400">Contributors</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-purple-400">234</div>
              <div className="text-xs text-gray-400">Discussions</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-amber-400">45</div>
              <div className="text-xs text-gray-400">In Development</div>
            </div>
          </div>
        </div>
      </div>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-4 max-sm:p-2">
        {filteredAndSortedProjects.map((content) => {
          const engagement = getEngagementLevel(
            content.likes + content.hearts,
            content.comments
          );

          return (
            <div key={content.id} className="group relative">
              {/* Featured/Hot Badge */}
              {content.featured && (
                <div className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  Featured
                </div>
              )}
              {content.isHot && !content.featured && (
                <div className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  Hot
                </div>
              )}

              <Link
                to={`/ideation-details?id=${content.id}`}
                className="block bg-[#1A1A1A] border border-white/10 rounded-2xl hover:border-white/20 hover:bg-[#212121] transition-all duration-300 group-hover:scale-[1.02] h-full"
              >
                <div className="p-6 space-y-4">
                  {/* Header with Author */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={content.author.avatar}
                          alt={content.author.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div className="absolute -bottom-1 -right-1 text-xs">
                          {content.author.badges[0]}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-white">
                          {content.author.name}
                        </h3>
                        <p className="text-xs text-gray-400">
                          {content.author.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`${getStageColor(
                          content.stage
                        )} text-white text-xs px-3 py-1 rounded-full font-medium`}
                      >
                        {content.stage}
                      </span>
                    </div>
                  </div>

                  {/* Idea Title & Description */}
                  <div className="space-y-3">
                    <h2 className="text-lg font-bold text-white leading-tight line-clamp-2">
                      {content.header}
                    </h2>
                    <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
                      {content.content}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {content.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-white/10 text-gray-300 text-xs px-2 py-1 rounded-lg hover:bg-white/20 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                    {content.tags.length > 3 && (
                      <span className="text-gray-400 text-xs px-2 py-1">
                        +{content.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-white">
                        {content.metrics.viability}
                      </div>
                      <div className="text-xs text-gray-400">Viability</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-white">
                        {content.metrics.timeline}
                      </div>
                      <div className="text-xs text-gray-400">Timeline</div>
                    </div>
                  </div>

                  {/* Engagement Stats */}
                  <div className="grid grid-cols-4 gap-4 py-3 border-t border-white/10">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4 text-red-400" />
                        <span className="text-sm font-medium">
                          {content.likes + content.hearts}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">Likes</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4 text-blue-400" />
                        <span className="text-sm font-medium">
                          {content.comments}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">Comments</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4 text-green-400" />
                        <span className="text-sm font-medium">
                          {content.views}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">Views</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-purple-400" />
                        <span className="text-sm font-medium">
                          {content.collaborators}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">Team</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Clock className="h-3 w-3" />
                      <span>{content.timeAgo}</span>
                      <span
                        className={`px-2 py-1 rounded-full ${engagement.color} bg-white/10`}
                      >
                        {engagement.level} Activity
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-400 text-sm font-medium">
                      <span>Discuss</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* Quick Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-white/20 backdrop-blur-sm p-2 rounded-lg hover:bg-white/30 transition-colors">
                  <Bookmark className="h-4 w-4 text-white" />
                </button>
                <button className="bg-white/20 backdrop-blur-sm p-2 rounded-lg hover:bg-white/30 transition-colors">
                  <Share2 className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* No Results State */}
      {filteredAndSortedProjects.length === 0 && (
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
    </div>
  );
};

export default Ideation;
