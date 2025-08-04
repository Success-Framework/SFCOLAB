import React, { useState } from "react";
import {
  ChevronDown,
  MapPin,
  Filter,
  Building2,
  Search,
  Plus,
  X,
  Menu,
} from "lucide-react";

const IdeationHeader = ({
  searchQuery,
  setSearchQuery,
  selectedStage,
  setSelectedStage,
  selectedIndustry,
  setSelectedIndustry,
}) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showNewIdeaForm, setShowNewIdeaForm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    industry: "",
    stage: "",
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
        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors w-full sm:w-auto"
      >
        {icon}
        <span>{selected || label}</span>
      </button>

      {activeDropdown === dropdownName && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-[#1A1A1A] rounded-lg shadow-lg py-2 z-50">
          {options.map((option, index) => (
            <button
              key={index}
              className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/10"
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

  const SearchBar = () => (
    <div className="relative w-full sm:w-auto">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search projects..."
          className="w-full sm:w-[300px] px-4 py-2 pl-10 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 text-white placeholder-gray-400"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
    </div>
  );

  const NewIdeaForm = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1A1A1A] rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Idea</h2>
          <button
            onClick={() => setShowNewIdeaForm(false)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 text-white h-32 resize-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Industry
            </label>
            <select
              value={formData.industry}
              onChange={(e) =>
                setFormData({ ...formData, industry: e.target.value })
              }
              className="w-full px-4 py-2 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 text-white"
              required
            >
              <option value="">Select Industry</option>
              {industries
                .filter((industry) => industry !== "All Industries")
                .map((industry, index) => (
                  <option key={index} value={industry}>
                    {industry}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Stage
            </label>
            <select
              value={formData.stage}
              onChange={(e) =>
                setFormData({ ...formData, stage: e.target.value })
              }
              className="w-full px-4 py-2 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 text-white"
              required
            >
              <option value="">Select Stage</option>
              {stages
                .filter((stage) => stage !== "All Stages")
                .map((stage, index) => (
                  <option key={index} value={stage}>
                    {stage}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setShowNewIdeaForm(false)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-white text-black hover:bg-gray-100 rounded-lg transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end min-h-[130px] p-4 gap-4 sm:gap-0">
      <div className="flex items-center justify-between w-full sm:w-auto">
        <h1 className="text-2xl font-semibold">Ideation</h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="sm:hidden p-2 hover:bg-white/10 rounded-lg"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      <div
        className={`${
          isMobileMenuOpen ? "flex" : "hidden"
        } sm:flex flex-col sm:flex-row gap-4 w-full sm:w-auto`}
      >
        <SearchBar />
        <FilterButton
          icon={<Filter className="h-4 w-4" />}
          label="Filter by stages"
          dropdownName="stages"
          options={stages}
          selected={selectedStage}
          onSelect={setSelectedStage}
        />
        <FilterButton
          icon={<Building2 className="h-4 w-4" />}
          label="Filter by industry"
          dropdownName="industries"
          options={industries}
          selected={selectedIndustry}
          onSelect={setSelectedIndustry}
        />
        <button
          onClick={() => setShowNewIdeaForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors w-full sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Add Ideas</span>
        </button>
      </div>
      {showNewIdeaForm && <NewIdeaForm />}
    </div>
  );
};

export default IdeationHeader;
