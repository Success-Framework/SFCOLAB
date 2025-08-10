import React, { useState } from "react";
import {
  ChevronDown,
  Filter,
  Building2,
  Search,
  Plus,
  X,
  TrendingUp,
  Clock,
  Heart,
  MessageSquare,
  Users,
  Zap,
  Lightbulb,
} from "lucide-react";
import { IoOptionsOutline } from "react-icons/io5";

const IdeationHeader = ({
  searchQuery,
  setSearchQuery,
  selectedStage,
  setSelectedStage,
  selectedIndustry,
  setSelectedIndustry,
  sortBy,
  setSortBy,
}) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showNewIdeaForm, setShowNewIdeaForm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    industry: "",
    stage: "",
    tags: "",
  });

  const stages = [
    "All Stages",
    "Idea Stage",
    "Concept Stage",
    "Development Stage",
    "Research Stage",
    "MVP Stage",
    "Growth Stage",
    "Scale Stage",
  ];

  const industries = [
    "All Industries",
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Retail",
    "Manufacturing",
    "Sustainability",
  ];

  const sortOptions = [
    { value: "trending", label: "Trending", icon: TrendingUp },
    { value: "latest", label: "Latest", icon: Clock },
    { value: "popular", label: "Most Liked", icon: Heart },
    { value: "discussed", label: "Most Discussed", icon: MessageSquare },
  ];

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    setShowNewIdeaForm(false);
    setFormData({
      title: "",
      description: "",
      industry: "",
      stage: "",
      tags: "",
    });
  };

  const FilterButton = ({
    icon,
    label,
    dropdownName,
    options,
    selected,
    onSelect,
  }) => (
    <div className="relative">
      <button
        onClick={() => toggleDropdown(dropdownName)}
        className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 w-full sm:w-auto border border-white/10 hover:border-white/20"
      >
        {icon}
        <span className="text-sm font-medium">{selected || label}</span>
        <ChevronDown className="h-4 w-4 opacity-60" />
      </button>

      {activeDropdown === dropdownName && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-[#1A1A1A] border border-white/20 rounded-xl shadow-2xl py-2 z-50 backdrop-blur-sm">
          {options.map((option, index) => (
            <button
              key={index}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
              onClick={() => {
                onSelect(option);
                setActiveDropdown(null);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const SortButton = () => (
    <div className="relative">
      <button
        onClick={() => toggleDropdown("sort")}
        className=" bg-[#1A1A1A] flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 w-full sm:w-auto border border-white/20"
      >
        <TrendingUp className="h-4 w-4" />
        <span className="text-sm font-medium">
          {sortOptions.find((opt) => opt.value === sortBy)?.label || "Sort"}
        </span>
        <ChevronDown className="h-4 w-4 opacity-60" />
      </button>

      {activeDropdown === "sort" && (
        <div className="absolute top-full left-0 mt-2 w-52 bg-[#1A1A1A] border border-white/20 rounded-xl shadow-2xl py-2 z-50 backdrop-blur-sm">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2"
              onClick={() => {
                setSortBy(option.value);
                setActiveDropdown(null);
              }}
            >
              <option.icon className="h-4 w-4" />
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const SearchBar = () => (
    <div className="relative w-full sm:w-auto">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search brilliant ideas..."
          className="w-full sm:w-[320px] px-4 py-2.5 pl-12 bg-white/10 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-400 transition-all duration-200"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
    </div>
  );

  const NewIdeaForm = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1A1A1A] border border-white/20 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-xl">
              <Lightbulb className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold">Share Your Brilliant Idea</h2>
          </div>
          <button
            onClick={() => setShowNewIdeaForm(false)}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Idea Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="What's your big idea?"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe your idea in detail. What problem does it solve? How does it work?"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-400 h-32 resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Industry *
              </label>
              <select
                value={formData.industry}
                onChange={(e) =>
                  setFormData({ ...formData, industry: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                required
              >
                <option value="" className="bg-gray-800">
                  Select Industry
                </option>
                {industries
                  .filter((industry) => industry !== "All Industries")
                  .map((industry, index) => (
                    <option
                      key={index}
                      value={industry}
                      className="bg-gray-800"
                    >
                      {industry}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Stage *
              </label>
              <select
                value={formData.stage}
                onChange={(e) =>
                  setFormData({ ...formData, stage: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                required
              >
                <option value="" className="bg-gray-800">
                  Select Stage
                </option>
                {stages
                  .filter((stage) => stage !== "All Stages")
                  .map((stage, index) => (
                    <option key={index} value={stage} className="bg-gray-800">
                      {stage}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tags
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              placeholder="e.g., AI, Mobile, Sustainability (comma separated)"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-400"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowNewIdeaForm(false)}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl transition-all duration-200 font-medium text-white shadow-lg"
            >
              Share Idea
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="w-full p-4 space-y-4">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        {/* <div className="flex items-center gap-4"> */}
          {/* <div className="flex items-center gap-3"> */}
            <div>
              <h1 className="text-2xl font-bold">Ideation Hub</h1>
              <p className="text-sm text-gray-400">
                Share, discover, and collaborate on innovative ideas
              </p>
            </div>
          {/* </div> */}
        {/* </div> */}

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="sm:hidden p-2 hover:bg-white/10 rounded-xl transition-colors"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <IoOptionsOutline className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Controls Section */}
      <div
        className={`${
          isMobileMenuOpen ? "flex" : "hidden"
        } sm:flex flex-col sm:flex-row gap-3 w-full`}
      >
        <div className="flex-1">
          <SearchBar />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <SortButton />
          <FilterButton
            icon={<Filter className="h-4 w-4" />}
            label="Stage"
            dropdownName="stages"
            options={stages}
            selected={selectedStage !== "All Stages" ? selectedStage : ""}
            onSelect={setSelectedStage}
          />
          <FilterButton
            icon={<Building2 className="h-4 w-4" />}
            label="Industry"
            dropdownName="industries"
            options={industries}
            selected={
              selectedIndustry !== "All Industries" ? selectedIndustry : ""
            }
            onSelect={setSelectedIndustry}
          />
          {/* <button
            onClick={() => setShowNewIdeaForm(true)}
            className="flex items-center gap-2 rounded-xl transition-all duration-200 w-full m-0 p-0 px-6 -py-2 sm:w-auto font-medium shadow-lg bg-blue-800 text-sm"
          > */}
          <button
            onClick={() => setShowNewIdeaForm(true)}
            className="flex items-center gap-2 rounded-xl transition-all duration-200 w-full px-6 py-0 sm:w-auto font-medium shadow-lg bg-[#1A1A1A] text-sm border border-white/20"
          >
            <Plus className="h-4 w-4" />
            <span>Share Idea</span>
          </button>
        </div>
      </div>

      {showNewIdeaForm && <NewIdeaForm />}
    </div>
  );
};

export default IdeationHeader;
