import {
  BriefcaseBusiness,
  CheckCheck,
  LocateIcon,
  User,
  Filter,
  Plus,
  MessageSquare,
  ThumbsUp,
  Tag,
  ArrowUpRight,
  Calendar,
  Users,
} from "lucide-react";
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import IdeationHeader from "../headers/IdeationHeader";

const Ideation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState("All Stages");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");

  const getStageColor = (stage) => {
    const colors = {
      "Idea Stage": "bg-blue-600",
      "Concept Stage": "bg-yellow-600",
      "Development Stage": "bg-green-600",
      "Research Stage": "bg-purple-600",
      "MVP Stage": "bg-red-600",
    };
    return colors[stage] || "bg-gray-600";
  };

  const cardContent = [
    {
      id: 1,
      header: "Smart Parenting Assistant",
      content: `A comprehensive mobile application designed to help parents manage their daily family activities, track children's development, and connect with other parents in their community.`,
      createdAt: "March 15, 2024",
      stage: "Idea Stage",
      category: "Technology",
      tags: ["Parenting", "Mobile App", "AI"],
      likes: 45,
      comments: 12,
      collaborators: 8,
      author: {
        name: "Sarah Johnson",
        role: "Product Designer",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
      metrics: {
        impact: "High",
        complexity: "Medium",
        timeline: "6 months",
      },
    },
    {
      id: 2,
      header: "Eco-Friendly Delivery Network",
      content: `A sustainable delivery service using electric vehicles and bicycles for last-mile delivery, reducing carbon emissions and promoting eco-friendly transportation solutions.`,
      createdAt: "March 14, 2024",
      stage: "Concept Stage",
      category: "Sustainability",
      tags: ["Green Tech", "Logistics", "Transportation"],
      likes: 32,
      comments: 8,
      collaborators: 5,
      author: {
        name: "Mike Chen",
        role: "Business Analyst",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      metrics: {
        impact: "Very High",
        complexity: "High",
        timeline: "12 months",
      },
    },
    {
      id: 3,
      header: "Virtual Reality Education Platform",
      content: `An immersive learning platform that uses VR technology to create engaging educational experiences, making complex subjects more accessible and interactive.`,
      createdAt: "March 13, 2024",
      stage: "Development Stage",
      category: "Education",
      tags: ["VR", "EdTech", "Learning"],
      likes: 28,
      comments: 15,
      collaborators: 12,
      author: {
        name: "Emma Davis",
        role: "UX Researcher",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
      metrics: {
        impact: "High",
        complexity: "Very High",
        timeline: "9 months",
      },
    },
    {
      id: 4,
      header: "AI-Powered Health Monitoring",
      content: `A wearable device that uses artificial intelligence to monitor vital signs and provide early warnings for potential health issues, helping users maintain better health.`,
      createdAt: "March 12, 2024",
      stage: "Research Stage",
      category: "Healthcare",
      tags: ["AI", "Healthcare", "Wearables"],
      likes: 56,
      comments: 23,
      collaborators: 15,
      author: {
        name: "Alex Wong",
        role: "Tech Lead",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
      metrics: {
        impact: "Very High",
        complexity: "High",
        timeline: "18 months",
      },
    },
  ];

  // Filter projects based on search query and filters
  const filteredProjects = useMemo(() => {
    return cardContent.filter((project) => {
      // Search query filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        project.header.toLowerCase().includes(searchLower) ||
        project.content.toLowerCase().includes(searchLower) ||
        project.category.toLowerCase().includes(searchLower) ||
        project.stage.toLowerCase().includes(searchLower) ||
        project.author.name.toLowerCase().includes(searchLower) ||
        project.author.role.toLowerCase().includes(searchLower) ||
        project.createdAt.toLowerCase().includes(searchLower) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
        Object.values(project.metrics).some((value) =>
          value.toLowerCase().includes(searchLower)
        );

      // Stage filter
      const matchesStage =
        selectedStage === "All Stages" || project.stage === selectedStage;

      // Industry/Category filter
      const matchesIndustry =
        selectedIndustry === "All Industries" ||
        project.category === selectedIndustry;

      return matchesSearch && matchesStage && matchesIndustry;
    });
  }, [searchQuery, selectedStage, selectedIndustry]);

  return (
    <div className="min-h-screen bg-black">
      <div className="mb-6">
        <IdeationHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedStage={selectedStage}
          setSelectedStage={setSelectedStage}
          selectedIndustry={selectedIndustry}
          setSelectedIndustry={setSelectedIndustry}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 p-4">
        {filteredProjects.map((content) => (
          <Link
            key={content.id}
            to={`/ideation-details?id=${content.id}`}
            className="bg-[#232323] rounded-4xl h-full hover:bg-[#2a2a2a] transition-colors duration-200"
          >
            <div className="w-full h-full p-2">
              <div className="bg-[#1A1A1A] flex-1 items-center justify-center min-h-[330px] rounded-4xl p-7 space-y-6">
                {/* header */}
                <div className="flex w-full justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-zinc-700">
                      <img
                        src={content.author.avatar}
                        alt={content.author.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h1 className="text-lg font-bold">{content.header}</h1>
                  </div>
                  <button
                    className={`${getStageColor(
                      content.stage
                    )} text-sm px-2 py-1 font-medium rounded-full`}
                  >
                    {content.stage}
                  </button>
                </div>

                {/* content */}
                <div className="text-sm font-medium leading-relaxed text-[#C4C4C4] line-clamp-3">
                  {content.content}
                </div>

                {/* metrics */}
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(content.metrics).map(
                    ([key, value], index) => (
                      <div
                        key={index}
                        className="bg-[#2A2A2A] rounded-lg p-2 text-center"
                      >
                        <p className="text-xs text-gray-400 mb-1">{key}</p>
                        <p className="text-sm font-medium">{value}</p>
                      </div>
                    )
                  )}
                </div>

                {/* tags */}
                <div className="flex flex-wrap gap-2">
                  {content.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-[#2A2A2A] text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* metadata */}
                <div className="flex items-center justify-between text-gray-400 text-sm">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4 text-blue-500" />
                      {content.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4 text-green-500" />
                      {content.comments}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-purple-500" />
                      {content.collaborators}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-[#535353]">
                    <Calendar className="h-4 w-4" />
                    {content.createdAt}
                  </span>
                </div>

                {/* author */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <img
                      src={content.author.avatar}
                      alt={content.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium">
                        {content.author.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {content.author.role}
                      </p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-blue-500 text-sm">
                    View Details
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Show message when no results found */}
      {filteredProjects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No projects found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms or filters to find what you're
              looking for.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ideation;
