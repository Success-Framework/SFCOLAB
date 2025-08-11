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
} from "lucide-react";
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import IdeationHeader from "../headers/IdeationHeader";
import ScrollToTop from "../sections/ScrollToTop";

const Ideation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState("All Stages");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [sortBy, setSortBy] = useState("trending"); // trending, latest, popular, discussed
  const [ideas, setIdeas] = useState(() => [
    {
      id: 1,
      title: "Smart Parenting Assistant",
      description: `A comprehensive mobile application designed to help parents manage their daily family activities, track children's development, and connect with other parents in their community.`,
      createdAt: "March 15, 2024",
      timeAgo: "2 hours ago",
      stage: "Idea Stage",
      category: "Technology",
      tags: ["Parenting", "Mobile App", "AI", "Community"],
      likes: 45,
      comments: 12,
      collaborators: 8,
      author: {
        name: "Sarah Johnson",
        role: "Product Designer",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
    },
    {
      id: 2,
      title: "Eco-Friendly Delivery Network",
      description: `A sustainable delivery service using electric vehicles and bicycles for last-mile delivery, reducing carbon emissions and promoting eco-friendly transportation solutions.`,
      createdAt: "March 14, 2024",
      timeAgo: "1 day ago",
      stage: "Concept Stage",
      category: "Sustainability",
      tags: ["Green Tech", "Logistics", "Transportation"],
      likes: 67,
      comments: 18,
      collaborators: 5,
      author: {
        name: "Mike Chen",
        role: "Business Analyst",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
    },
    {
      id: 3,
      title: "Virtual Reality Education Platform",
      description: `An immersive learning platform that uses VR technology to create engaging educational experiences, making complex subjects more accessible and interactive.`,
      createdAt: "March 13, 2024",
      timeAgo: "2 days ago",
      stage: "Development Stage",
      category: "Education",
      tags: ["VR", "EdTech", "Learning"],
      likes: 38,
      comments: 15,
      collaborators: 12,
      author: {
        name: "Emma Davis",
        role: "UX Researcher",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
    },
    {
      id: 4,
      title: "AI-Powered Health Monitoring",
      description: `A wearable device that uses artificial intelligence to monitor vital signs and provide early warnings for potential health issues, helping users maintain better health.`,
      createdAt: "March 12, 2024",
      timeAgo: "3 days ago",
      stage: "Research Stage",
      category: "Healthcare",
      tags: ["AI", "Healthcare", "Wearables"],
      likes: 82,
      comments: 23,
      collaborators: 15,
      author: {
        name: "Alex Wong",
        role: "Tech Lead",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
    },
    {
      id: 5,
      title: "Community Food Sharing App",
      description: `A platform that connects neighbors to share surplus food, reduce waste, and build stronger community bonds through food exchange.`,
      createdAt: "March 11, 2024",
      timeAgo: "4 days ago",
      stage: "Idea Stage",
      category: "Community",
      tags: ["Food", "Community", "Sustainability"],
      likes: 29,
      comments: 8,
      collaborators: 6,
      author: {
        name: "Lisa Park",
        role: "Community Organizer",
        avatar: "https://i.pravatar.cc/150?img=8",
      },
    },
    {
      id: 6,
      title: "Smart Home Energy Optimizer",
      description: `An AI system that learns household energy patterns and automatically optimizes usage to reduce bills and environmental impact.`,
      createdAt: "March 10, 2024",
      timeAgo: "5 days ago",
      stage: "Concept Stage",
      category: "Technology",
      tags: ["Smart Home", "Energy", "AI"],
      likes: 56,
      comments: 14,
      collaborators: 9,
      author: {
        name: "David Miller",
        role: "Energy Engineer",
        avatar: "https://i.pravatar.cc/150?img=9",
      },
    },
  ]);

  const handleCreateIdea = (payload) => {
    const now = new Date();
    const newIdea = {
      id: Date.now(),
      title: payload.title,
      description: payload.description,
      createdAt: now.toISOString(),
      timeAgo: "just now",
      stage: payload.stage,
      category: payload.industry,
      tags: payload.tags,
      likes: 0,
      comments: 0,
      collaborators: 1,
      author: {
        name: "You",
        role: "Contributor",
        avatar: "https://i.pravatar.cc/150?img=11",
      },
    };
    setIdeas((prev) => [newIdea, ...prev]);
    setSortBy("latest");
    setSearchQuery("");
  };

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

  // Filter projects based on search query and filters
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = ideas.filter((project) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
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

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 max-sm:p-2">
        {filteredAndSortedProjects.map((content) => (
          <div key={content.id} className="group relative">
            <Link
              to={`/ideation-details?id=${content.id}`}
              className="block bg-[#1A1A1A] border border-white/10 rounded-xl hover:border-white/20 hover:bg-[#212121] transition-all duration-300 group-hover:scale-[1.02] h-full"
            >
              <div className="p-6 space-y-4">
                {/* Header with Author */}
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

                {/* Idea Title & Description */}
                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-white leading-tight line-clamp-2">
                    {content.title}
                  </h2>
                  <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
                    {content.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {content.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-white/5 text-gray-300 text-xs px-2 py-1 rounded-md hover:bg-white/10 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                  {content.tags.length > 3 && (
                    <span className="text-gray-400 text-xs px-2 py-1">
                      +{content.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Subtle Engagement Metrics */}
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

                {/* Discussion CTA */}
                <div className="flex items-center justify-center pt-2">
                  <span className="text-blue-400 text-sm font-medium flex items-center gap-1 group-hover:text-blue-300 transition-colors">
                    <MessageSquare className="h-4 w-4" />
                    Join Discussion
                  </span>
                </div>
              </div>
            </Link>

            {/* Quick Action Buttons */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors">
                <Bookmark className="h-4 w-4 text-white" />
              </button>
              <button className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors">
                <Share2 className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        ))}
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
