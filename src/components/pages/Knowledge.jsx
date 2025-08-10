import React, { useState, useMemo } from "react";
import KnowledgeHeader from "../headers/KnowledgeHeader";
import {
  FileText,
  Calendar,
  User,
  Tag,
  Eye,
  Download,
  ThumbsUp,
  ArrowUpRight,
  FileType,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import Options from "../sections/Options";

const Knowledge = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedSort, setSelectedSort] = useState("Newest First");

  const getFileTypeColor = (type) => {
    const colors = {
      PDF: "bg-red-600",
      DOC: "bg-blue-600",
      XLS: "bg-green-600",
      PPT: "bg-yellow-600",
      TXT: "bg-gray-600",
    };
    return colors[type] || "bg-gray-600";
  };

  const knowledgeContent = [
    {
      id: 1,
      title: "Marketing Strategy Guide 2024",
      description:
        "Comprehensive guide covering modern marketing strategies, including digital marketing, social media, and content marketing approaches for startups.",
      category: "Marketing",
      author: {
        name: "John Doe",
        role: "Marketing Director",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
      date: "March 6, 2024",
      fileType: "PDF",
      views: "1.2k",
      downloads: 234,
      likes: 45,
      tags: ["Marketing", "Strategy", "Digital Marketing"],
      metrics: {
        pages: 45,
        size: "2.4 MB",
        lastUpdated: "2 days ago",
      },
    },
    {
      id: 2,
      title: "Product Development Framework",
      description:
        "A detailed framework for product development, from ideation to launch, including best practices and common pitfalls to avoid.",
      category: "Product",
      author: {
        name: "Jane Smith",
        role: "Product Manager",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
      date: "March 5, 2024",
      fileType: "DOC",
      views: "856",
      downloads: 189,
      likes: 32,
      tags: ["Product", "Development", "Framework"],
      metrics: {
        pages: 32,
        size: "1.8 MB",
        lastUpdated: "3 days ago",
      },
    },
    {
      id: 3,
      title: "Technical Documentation Template",
      description:
        "Standardized template for technical documentation, ensuring consistency and clarity in project documentation.",
      category: "Development",
      author: {
        name: "Mike Johnson",
        role: "Tech Lead",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
      date: "March 4, 2024",
      fileType: "PDF",
      views: "2.1k",
      downloads: 567,
      likes: 78,
      tags: ["Technical", "Documentation", "Template"],
      metrics: {
        pages: 28,
        size: "1.5 MB",
        lastUpdated: "1 day ago",
      },
    },
    {
      id: 4,
      title: "Financial Planning for Startups",
      description:
        "Essential financial planning guide for startups, covering budgeting, fundraising, and financial management.",
      category: "Finance",
      author: {
        name: "Sarah Wilson",
        role: "Financial Analyst",
        avatar: "https://i.pravatar.cc/150?img=4",
      },
      date: "March 3, 2024",
      fileType: "XLS",
      views: "1.5k",
      downloads: 432,
      likes: 56,
      tags: ["Finance", "Planning", "Startup"],
      metrics: {
        pages: 36,
        size: "3.2 MB",
        lastUpdated: "4 days ago",
      },
    },
  ];

  // Filter and sort knowledge content based on search query and filters
  const filteredAndSortedContent = useMemo(() => {
    let filtered = knowledgeContent.filter((content) => {
      // Search query filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        content.title.toLowerCase().includes(searchLower) ||
        content.description.toLowerCase().includes(searchLower) ||
        content.category.toLowerCase().includes(searchLower) ||
        content.author.name.toLowerCase().includes(searchLower) ||
        content.author.role.toLowerCase().includes(searchLower) ||
        content.fileType.toLowerCase().includes(searchLower) ||
        content.date.toLowerCase().includes(searchLower) ||
        content.views.toLowerCase().includes(searchLower) ||
        content.downloads.toString().includes(searchLower) ||
        content.likes.toString().includes(searchLower) ||
        content.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
        Object.values(content.metrics).some((value) =>
          value.toString().toLowerCase().includes(searchLower)
        );

      // Category filter
      const matchesCategory =
        selectedCategory === "All Categories" ||
        content.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Sort the filtered results
    switch (selectedSort) {
      case "Newest First":
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "Oldest First":
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "A-Z":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Z-A":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedSort]);

  return (
    <div className="min-h-screen bg-black">
      <Options />
      <KnowledgeHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 p-4 max-sm:p-0">
        {filteredAndSortedContent.map((content) => (
          <Link
            key={content.id}
            to={`/knowledge-details?id=${content.id}`}
            className="bg-[#232323] rounded-4xl h-full hover:bg-[#2a2a2a] transition-colors duration-200"
          >
            <div className="w-full h-full p-2 max-sm:p-1">
              <div className="bg-[#1A1A1A] flex-1 items-center justify-center min-h-[330px] rounded-4xl p-7 space-y-6 max-sm:p-5">
                {/* header */}
                <div className="flex w-full justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-zinc-700 flex items-center justify-center">
                      <FileType className="h-6 w-6 text-gray-400" />
                    </div>
                    <h1 className="text-lg max-sm:text-base font-bold">{content.title}</h1>
                  </div>
                  <button
                    className={`${getFileTypeColor(
                      content.fileType
                    )} text-sm px-2 py-1 font-medium rounded-full`}
                  >
                    {content.fileType}
                  </button>
                </div>

                {/* content */}
                <div className="text-sm font-medium max-sm:font-normal leading-relaxed text-[#C4C4C4] line-clamp-3">
                  {content.description}
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
                <div className="grid grid-cols-2 font-medium text-[#C4C4C4] gap-4">
                  <div className="space-y-3">
                    <p className="flex items-center gap-2 text-sm">
                      <User size={18} className="text-blue-500" />
                      <span className="flex items-center gap-2">
                        <img
                          src={content.author.avatar}
                          alt={content.author.name}
                          className="w-5 h-5 rounded-full"
                        />
                        {content.author.name}
                      </span>
                    </p>
                    <p className="flex items-center gap-2 text-sm">
                      <Tag size={18} className="text-green-500" />
                      {content.category}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <p className="flex items-center gap-2 text-sm">
                      <Eye size={18} className="text-purple-500" />
                      {content.views}
                    </p>
                    <p className="flex items-center gap-2 text-sm">
                      <Download size={18} className="text-yellow-500" />
                      {content.downloads}
                    </p>
                  </div>
                </div>

                {/* footer */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <div className="flex items-center gap-4 text-gray-400">
                    <span className="flex items-center gap-1">
                      <ThumbsUp size={16} className="text-red-500" />
                      {content.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={16} className="text-blue-500" />
                      {content.date}
                    </span>
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
      {filteredAndSortedContent.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No knowledge resources found
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

export default Knowledge;
