import React, { useState, useRef } from "react";
import {
  ChevronDown,
  Filter,
  Building2,
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
import SearchBar from "../sections/SearchBar";
import axios from "axios";

const IdeationHeader = ({
  searchQuery,
  setSearchQuery,
  selectedStage,
  setSelectedStage,
  selectedIndustry,
  setSelectedIndustry,
  sortBy,
  setSortBy,
  onCreateIdea,
}) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showNewIdeaForm, setShowNewIdeaForm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Use refs instead of controlled state to prevent focus loss
  const titleRef = useRef("");
  const descriptionRef = useRef("");
  const projectDetailsRef = useRef("");
  const industryRef = useRef("");
  const stageRef = useRef("");
  const tagsRef = useRef("");
  const searchTimeoutRef = useRef(null);
  const [, setTick] = useState(0);
  const forceRender = () => setTick((t) => t + 1);

  const teamMembersRef = useRef([{ name: "", position: "", skills: "" }]);

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

 const handleFormSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    title: (titleRef.current || '').trim(),
    description: (descriptionRef.current || '').trim(),
    projectDetails: (projectDetailsRef.current || '').trim(),
    teamMembers: teamMembersRef.current.map((m) => ({
      name: (m.name || '').trim(),
      position: (m.position || '').trim(),
      skills: (m.skills || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    })),
    industry: industryRef.current || 'Technology',
    stage: stageRef.current || 'Idea Stage',
    tags: (tagsRef.current || '')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
  };

  console.log('Submitting idea payload:', payload);

  try {
    // get token from localStorage
    const token = localStorage.getItem('authToken');

    if (!token) {
      alert('You must be logged in first.');
      return;
    }

    const res = await axios.post(
      'https://sfcollab-backend.onrender.com/api/ideation',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('Idea submitted successfully:', res.data);

    // close modal
    setShowNewIdeaForm(false);

    // reset refs and force re-render so UI inputs clear
    titleRef.current = '';
    descriptionRef.current = '';
    projectDetailsRef.current = '';
    // reset team to one blank member
    teamMembersRef.current = [{ name: '', position: '', skills: '' }];
    forceRender();
    industryRef.current = '';
    stageRef.current = '';
    tagsRef.current = '';

    // pass the created idea to parent (handle both shapes)
    if (onCreateIdea) onCreateIdea(res.data?.idea ?? res.data);
  } catch (err) {
    console.error('Error submitting idea:', err);
    if (err.response?.data) {
      console.error('Server validation details:', err.response.data);
      alert(err.response.data.message || 'Failed to submit idea');
    } else {
      alert(err.message || 'Failed to submit idea');
    }
  }
};



  //Add new team member
  const addTeamMember = () => {
    if (teamMembersRef.current.length >= 3) return;
      teamMembersRef.current.push({ name: "", position: "", skills: "" });
      forceRender();
    };

  // (Optional) remove to bring the add button back
  const removeTeamMember = (index) => {
    teamMembersRef.current.splice(index, 1);
    forceRender();
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

  const NewIdeaForm = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1A1A1A] border border-white/20 rounded-2xl p-6 w-full max-w-lg max-h-[500px] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Share Your Brilliant Idea</h2>
          <button
            onClick={() => setShowNewIdeaForm(false)}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-5" noValidate>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Idea Title *
            </label>
            <input
              type="text"
              defaultValue=""
              onChange={(e) => {
                titleRef.current = e.target.value;
              }}
              placeholder="What's your big idea?"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-400 placeholder:text-xs"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              defaultValue=""
              onChange={(e) => {
                descriptionRef.current = e.target.value;
              }}
              placeholder="Give a brief description of your idea"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-400 h-32 resize-none placeholder:text-xs"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Project Details *
            </label>
            <textarea
              defaultValue=""
              onChange={(e) => {
                projectDetailsRef.current = e.target.value;
              }}
              placeholder="Go further by giving deeper and structured details of your project. What it's about, and how it works"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-400 h-32 resize-none placeholder:text-xs"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Add team members (Up to 3)
            </label>

            {teamMembersRef.current.map((member, index) => (
              <div key={index} className="mb-6">
                <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Name of team member"
                    onChange={(e) => {
                      teamMembersRef.current[index].name = e.target.value;
                    }}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-400 placeholder:text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Position"
                    onChange={(e) => {
                      teamMembersRef.current[index].position = e.target.value;
                    }}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-400 placeholder:text-xs"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Skills (Up to 3)"
                  onChange={(e) => {
                    teamMembersRef.current[index].skills = e.target.value;
                  }}
                  className="w-full mt-4 px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-400 placeholder:text-xs"
                />
                {/* Optional remove button */}
            {teamMembersRef.current.length > 1 && (
              <button
                type="button"
                onClick={() => removeTeamMember(index)}
                className="mt-4 px-3 py-2 border border-gray-600 rounded-md text-white hover:bg-gray-800"
              >
                Remove
              </button>
            )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Industry *
              </label>
              <select
                defaultValue=""
                onChange={(e) => {
                  industryRef.current = e.target.value;
                }}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white text-xs"
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
                defaultValue=""
                onChange={(e) => {
                  stageRef.current = e.target.value;
                }}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white text-xs"
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
              defaultValue=""
              onChange={(e) => {
                tagsRef.current = e.target.value;
              }}
              placeholder="e.g., AI, Mobile, Sustainability (comma separated)"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-400 placeholder:text-xs"
            />
          </div>

            {teamMembersRef.current.length < 3 && (
        <div
          role="button"
          tabIndex={0}
          onClick={addTeamMember}
          onKeyDown={(e) =>
            e.key === "Enter" || e.key === " " ? addTeamMember() : null
          }
          className="flex items-center justify-center px-4 py-2 border border-gray-600 rounded-md 
                     text-white hover:bg-gray-800 transition-colors cursor-pointer"
        >
          {/* <Plus className="w-4 h-4 mr-2" /> */}
          Add another team member
        </div>
      )}


          <div className="flex justify-end gap-3 pt-4 max-sm:text-sm">
            <button
              type="button"
              onClick={() => setShowNewIdeaForm(false)}
              className="px-6 py-2.5 bg-white/10 shadow-md hover:bg-white/20 rounded-xl transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gray-200 shadow-md hover:bg-gray-300 rounded-xl transition-all duration-200 font-medium text-black shadow-lg"
            >
              Share Idea
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="w-full p-4 px-2 space-y-4">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        {/* <div className="flex items-center gap-4"> */}
        {/* <div className="flex items-center gap-3"> */}
        <div>
          <h1 className="text-2xl font-bold">Ideation Hub</h1>
          <p className="text-xs text-gray-400">
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
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchTimeoutRef={searchTimeoutRef}
          />
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
          <button
            onClick={() => setShowNewIdeaForm(true)}
            className="flex items-center justify-center gap-2 rounded-lg transition-all duration-200 w-full px-4 py-2.5  sm:w-auto font-medium shadow-lg bg-gray-200 text-black text-sm border border-white/20"
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
