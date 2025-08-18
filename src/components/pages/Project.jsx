import {
  Star,
  Users,
  Briefcase,
  Filter,
  Plus,
  BriefcaseBusiness,
  List,
  ArrowUpRight,
  Calendar,
  Award,
  Code2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { allimg } from "../../utils";
import FindContributionHeader from "../headers/FindContributionHeader";
import React, { useState, useMemo } from "react";
import ScrollToTop from "../sections/ScrollToTop";
import { useEffect } from "react";

export default function Project() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUserType, setSelectedUserType] = useState("All User Types");
  const [selectedAvailability, setSelectedAvailability] =
    useState("All Availability");
  const [selectedPosition, setSelectedPosition] = useState("All Positions");

  // Tabs: Freelancers | Gigs
  const [activeTab, setActiveTab] = useState("freelancers");
  // Gigs state
  const [gigs, setGigs] = useState([
    { id: 1, title: "Landing Page Design", scope: "Design a modern landing page for a SaaS startup.", budget: 500, deadline: "2024-06-10", category: "Design", skills: ["UI/UX", "Figma"], rate: 50 },
    { id: 2, title: "API Integration", scope: "Integrate payment gateway API into our platform.", budget: 800, deadline: "2024-06-15", category: "Development", skills: ["Node.js", "API"], rate: 60 },
    { id: 3, title: "Pitch Deck Polish", scope: "Refine and polish our investor pitch deck.", budget: 300, deadline: "2024-06-12", category: "Business", skills: ["PowerPoint", "Storytelling"], rate: 40 },
  ]);
  // Gig filters
  const [gigSkill, setGigSkill] = useState("");
  const [gigRate, setGigRate] = useState("");
  const [gigDeadline, setGigDeadline] = useState("");
  // Post Gig modal
  const [showPostGig, setShowPostGig] = useState(false);
  const [newGig, setNewGig] = useState({ title: "", scope: "", budget: "", deadline: "", category: "", skills: "", rate: "" });
  // Apply to Gig modal
  const [applyGigId, setApplyGigId] = useState(null);
  const [applyMessage, setApplyMessage] = useState("");
  const [applyPortfolio, setApplyPortfolio] = useState("");
  // AI Matchmaking
  const [showAIMatch, setShowAIMatch] = useState(false);

  const employees = [
    {
      id: 1,
      name: "Lipp Tom",
      username: "lipp",
      avatar: allimg.profileImg,
      bio: "Engineer, founder, ceo & Developer that can be found inhabiting coffee houses",
      joined: "March 6, 2024",
      role: "Employee",
      userType: "Developer",
      position: "Full Stack Developer",
      availability: "Available Now",
      follower: "10",
      project: "4",
      rating: "4.8",
      skills: ["React", "Node.js", "TypeScript", "AWS", "Docker", "GraphQL"],
      experience: [
        {
          title: "Senior Developer",
          company: "Tech Corp",
          duration: "2020 - Present",
          description: "Leading development of enterprise applications",
        },
      ],
      metrics: {
        contributions: "1.2k",
        commits: "856",
        reviews: "234",
      },
    },
    {
      id: 2,
      name: "Mask ho",
      username: "mask", 
      avatar: allimg.profileImg,
      bio: "Engineer, founder, ceo & Developer that can be found inhabiting coffee houses",
      joined: "March 6, 2024",
      role: "Employee",
      userType: "Developer",
      position: "Backend Developer",
      availability: "Available in 1 Week",
      follower: "10",
      project: "4",
      rating: "4.5",
      skills: ["Python", "Django", "PostgreSQL", "Docker", "Kubernetes", "AWS"],
      experience: [
        {
          title: "Backend Developer",
          company: "Data Systems",
          duration: "2019 - Present",
          description: "Building scalable backend services",
        },
      ],
      metrics: {
        contributions: "980",
        commits: "654",
        reviews: "189",
      },
    },
    {
      id: 3,
      name: "Nom Na",
      username: "nomna",
      avatar: allimg.profileImg, 
      bio: "Engineer, founder, ceo & Developer that can be found inhabiting coffee houses",
      joined: "March 6, 2024",
      role: "Employee",
      userType: "Designer",
      position: "UI/UX Designer",
      availability: "Full-time",
      follower: "10",
      project: "4",
      rating: "4.9",
      skills: [
        "Vue.js",
        "Firebase",
        "Tailwind",
        "GraphQL",
        "TypeScript",
        "Jest",
      ],
      experience: [
        {
          title: "Frontend Developer",
          company: "Web Solutions",
          duration: "2021 - Present",
          description: "Creating modern web applications",
        },
      ],
      metrics: {
        contributions: "1.5k",
        commits: "1.2k",
        reviews: "345",
      },
    },
    {
      id: 4,
      name: "Lipp",
      username: "lipp",
      avatar: allimg.profileImg,
      bio: "Engineer, founder, ceo & Developer that can be found inhabiting coffee houses", 
      joined: "March 6, 2024",
      role: "Employee",
      userType: "Product Manager",
      position: "Product Manager",
      availability: "Part-time",
      follower: "10",
      project: "4",
      rating: "4.7",
      skills: ["Java", "Spring Boot", "MySQL", "Kubernetes", "Docker", "AWS"],
      experience: [
        {
          title: "Full Stack Developer",
          company: "Enterprise Solutions",
          duration: "2018 - Present",
          description: "Full stack development and architecture",
        },
      ],
      metrics: {
        contributions: "1.1k",
        commits: "789",
        reviews: "267",
      },
    },
  ];

  // Filter employees based on search query and filters
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      // Search query filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        employee.name.toLowerCase().includes(searchLower) ||
        employee.username.toLowerCase().includes(searchLower) ||
        employee.bio.toLowerCase().includes(searchLower) ||
        employee.role.toLowerCase().includes(searchLower) ||
        employee.userType.toLowerCase().includes(searchLower) ||
        employee.position.toLowerCase().includes(searchLower) ||
        employee.availability.toLowerCase().includes(searchLower) ||
        employee.follower.toLowerCase().includes(searchLower) ||
        employee.project.toLowerCase().includes(searchLower) ||
        employee.rating.toLowerCase().includes(searchLower) ||
        employee.joined.toLowerCase().includes(searchLower) ||
        employee.skills.some((skill) =>
          skill.toLowerCase().includes(searchLower)
        ) ||
        employee.experience.some(
          (exp) =>
            exp.title.toLowerCase().includes(searchLower) ||
            exp.company.toLowerCase().includes(searchLower) ||
            exp.description.toLowerCase().includes(searchLower)
        ) ||
        Object.values(employee.metrics).some((value) =>
          value.toLowerCase().includes(searchLower)
        );

      // User Type filter
      const matchesUserType =
        selectedUserType === "All User Types" ||
        employee.userType === selectedUserType;

      // Availability filter
      const matchesAvailability =
        selectedAvailability === "All Availability" ||
        employee.availability === selectedAvailability;

      // Position filter
      const matchesPosition =
        selectedPosition === "All Positions" ||
        employee.position === selectedPosition;

      return (
        matchesSearch &&
        matchesUserType &&
        matchesAvailability &&
        matchesPosition
      );
    });
  }, [searchQuery, selectedUserType, selectedAvailability, selectedPosition]);

  // Filter gigs
  const filteredGigs = gigs.filter(gig =>
    (!gigSkill || gig.skills.join(",").toLowerCase().includes(gigSkill.toLowerCase())) &&
    (!gigRate || gig.rate >= parseInt(gigRate)) &&
    (!gigDeadline || gig.deadline <= gigDeadline)
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mb-0">
        <FindContributionHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedUserType={selectedUserType}
          setSelectedUserType={setSelectedUserType}
          selectedAvailability={selectedAvailability}
          setSelectedAvailability={setSelectedAvailability}
          selectedPosition={selectedPosition}
          setSelectedPosition={setSelectedPosition}
        />
      </div>
      {/* Tabs */}
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 pt-4 mb-4 flex gap-2">
        <button className={`px-4 py-2 rounded-t-lg font-semibold text-sm ${activeTab === "freelancers" ? "bg-blue-600 text-white" : "bg-[#232323] text-gray-300"}`} onClick={() => setActiveTab("freelancers")}>Freelancers</button>
        <button className={`px-4 py-2 rounded-t-lg font-semibold text-sm ${activeTab === "gigs" ? "bg-green-600 text-white" : "bg-[#232323] text-gray-300"}`} onClick={() => setActiveTab("gigs")}>Gigs</button>
      </div>
      {/* AI Matchmaking Widget */}
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 mb-4">
        <div className="bg-[#18181A] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow">
          <div className="flex items-center gap-3">
            <Users className="text-blue-400" size={22} />
            <span className="text-white font-semibold">AI Matchmaking</span>
            <span className="text-gray-400 text-xs sm:text-sm">Suggested freelancers for your gig!</span>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors" onClick={() => setShowAIMatch(true)}>Get Suggestions</button>
        </div>
      </div>
      {/* Post Gig Button */}
      {activeTab === "gigs" && (
        <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 mb-4 flex justify-end">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold shadow" onClick={() => setShowPostGig(true)}>
            + Post Gig
          </button>
        </div>
      )}
      {/* Post Gig Modal */}
      {showPostGig && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="bg-[#18181A] rounded-2xl p-8 max-w-lg w-full shadow-xl border border-white/10">
            <h2 className="text-xl font-bold mb-4 text-white">Post a New Gig</h2>
            <form onSubmit={e => { e.preventDefault(); setGigs([{ ...newGig, id: Date.now(), skills: newGig.skills.split(",").map(s => s.trim()), rate: parseInt(newGig.rate) }, ...gigs]); setShowPostGig(false); setNewGig({ title: "", scope: "", budget: "", deadline: "", category: "", skills: "", rate: "" }); }} className="space-y-3">
              <input className="w-full bg-[#232323] rounded-lg px-3 py-2 text-white placeholder-gray-400" placeholder="Title" value={newGig.title} onChange={e => setNewGig({ ...newGig, title: e.target.value })} required />
              <textarea className="w-full bg-[#232323] rounded-lg px-3 py-2 text-white placeholder-gray-400" placeholder="Scope" value={newGig.scope} onChange={e => setNewGig({ ...newGig, scope: e.target.value })} required />
              <input className="w-full bg-[#232323] rounded-lg px-3 py-2 text-white placeholder-gray-400" placeholder="Budget ($)" type="number" value={newGig.budget} onChange={e => setNewGig({ ...newGig, budget: e.target.value })} required />
              <input className="w-full bg-[#232323] rounded-lg px-3 py-2 text-white placeholder-gray-400" placeholder="Deadline (YYYY-MM-DD)" type="date" value={newGig.deadline} onChange={e => setNewGig({ ...newGig, deadline: e.target.value })} required />
              <input className="w-full bg-[#232323] rounded-lg px-3 py-2 text-white placeholder-gray-400" placeholder="Category" value={newGig.category} onChange={e => setNewGig({ ...newGig, category: e.target.value })} required />
              <input className="w-full bg-[#232323] rounded-lg px-3 py-2 text-white placeholder-gray-400" placeholder="Skills (comma separated)" value={newGig.skills} onChange={e => setNewGig({ ...newGig, skills: e.target.value })} required />
              <input className="w-full bg-[#232323] rounded-lg px-3 py-2 text-white placeholder-gray-400" placeholder="Rate ($/hr)" type="number" value={newGig.rate} onChange={e => setNewGig({ ...newGig, rate: e.target.value })} required />
              <div className="flex gap-2 justify-end pt-2">
                <button type="button" className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium" onClick={() => setShowPostGig(false)}>Cancel</button>
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold">Post Gig</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Apply to Gig Modal */}
      {applyGigId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="bg-[#18181A] rounded-2xl p-8 max-w-lg w-full shadow-xl border border-white/10">
            <h2 className="text-xl font-bold mb-4 text-white">Apply to Gig</h2>
            <form onSubmit={e => { e.preventDefault(); setApplyGigId(null); setApplyMessage(""); setApplyPortfolio(""); }} className="space-y-3">
              <textarea className="w-full bg-[#232323] rounded-lg px-3 py-2 text-white placeholder-gray-400" placeholder="Message to client" value={applyMessage} onChange={e => setApplyMessage(e.target.value)} required />
              <input className="w-full bg-[#232323] rounded-lg px-3 py-2 text-white placeholder-gray-400" placeholder="Portfolio link" value={applyPortfolio} onChange={e => setApplyPortfolio(e.target.value)} required />
              <div className="flex gap-2 justify-end pt-2">
                <button type="button" className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium" onClick={() => setApplyGigId(null)}>Cancel</button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold">Apply</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* AI Matchmaking Modal (placeholder) */}
      {showAIMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="bg-[#18181A] rounded-2xl p-8 max-w-lg w-full shadow-xl border border-white/10">
            <h2 className="text-xl font-bold mb-4 text-white">AI Matchmaking</h2>
            <p className="text-gray-300 mb-4 text-sm">Here are some suggested freelancers for your gig (mock):</p>
            <ul className="mb-4 space-y-2">
              {employees.slice(0, 3).map(e => (
                <li key={e.id} className="flex items-center gap-3">
                  <img src={e.avatar} alt={e.name} className="h-8 w-8 rounded-full" />
                  <span className="font-semibold text-white">{e.name}</span>
                  <span className="text-xs text-gray-400">{e.position}</span>
                </li>
              ))}
            </ul>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors" onClick={() => setShowAIMatch(false)}>
              Close
            </button>
          </div>
        </div>
      )}
      {/* Gigs Tab */}
      {activeTab === "gigs" && (
        <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 mb-4">
          {/* Gig Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            <input className="bg-[#232323] rounded-lg px-3 py-2 text-white placeholder-gray-400" placeholder="Skill" value={gigSkill} onChange={e => setGigSkill(e.target.value)} />
            <input className="bg-[#232323] rounded-lg px-3 py-2 text-white placeholder-gray-400" placeholder="Min Rate ($/hr)" type="number" value={gigRate} onChange={e => setGigRate(e.target.value)} />
            <input className="bg-[#232323] rounded-lg px-3 py-2 text-white placeholder-gray-400" placeholder="Deadline (YYYY-MM-DD)" type="date" value={gigDeadline} onChange={e => setGigDeadline(e.target.value)} />
          </div>
          {/* Gig Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGigs.map(gig => (
              <div key={gig.id} className="bg-[#1A1A1A] rounded-2xl p-6 flex flex-col shadow hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white">{gig.title}</h3>
                  <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full font-semibold">{gig.category}</span>
                </div>
                <p className="text-gray-300 text-sm mb-2 line-clamp-2">{gig.scope}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {gig.skills.map((skill, i) => (
                    <span key={i} className="bg-blue-700/20 text-blue-300 text-xs px-2 py-0.5 rounded-full">{skill}</span>
                  ))}
                </div>
                <div className="flex items-center gap-4 mb-2 text-xs text-gray-400">
                  <span>Budget: <span className="text-white font-semibold">${gig.budget}</span></span>
                  <span>Rate: <span className="text-white font-semibold">${gig.rate}/hr</span></span>
                  <span>Deadline: <span className="text-white font-semibold">{gig.deadline}</span></span>
                </div>
                <div className="flex gap-2 mt-auto">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-xs" onClick={() => setApplyGigId(gig.id)}>Apply</button>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-xs" onClick={() => alert('Task auto-created in SFManagers (mock)!')}>Hire</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Freelancers Tab (default) */}
      {activeTab === "freelancers" && (
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {filteredEmployees.map((employee) => (
            <Link 
              key={employee.id}
              to={`/project-details?id=${employee.id}`}
                className="bg-zinc-900 p-3 min-h-[120px] rounded-xl flex flex-col sm:flex-col h-full hover:bg-zinc-800 transition-colors"
            >
                <div className="bg-[#1A1A1A] min-h-[100px] rounded-4xl p-4 flex flex-col sm:flex-col max-sm:flex-row max-sm:items-center max-sm:gap-4">
                  {/* Avatar (left on mobile) */}
                  <div className="flex-shrink-0 flex justify-center items-center max-sm:mr-4">
                    <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden bg-zinc-700 flex items-center justify-center text-white text-lg font-bold">
                    <img
                      src={employee.avatar}
                      alt={employee.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  </div>
                  {/* Main Info (right on mobile) */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-base sm:text-lg">{employee.name}</h3>
                          <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full uppercase">{employee.role}</span>
                        </div>
                        <p className="text-gray-400 text-xs sm:text-sm">@{employee.username}</p>
                        <p className="text-gray-500 text-xs mt-1">{employee.position}</p>
                      </div>
                      {/* View Profile Button (mobile: bottom, desktop: top right) */}
                      <Link
                    to={`/profile?username=${employee.username}`}
                        className="text-xs text-blue-400 hover:text-white transition-colors flex items-center gap-1 max-sm:mt-2 max-sm:w-fit max-sm:self-end"
                  >
                    View Profile
                    <ArrowUpRight size={12} />
                      </Link>
                    </div>
                    {/* Skills (show 2 on mobile, 3 on desktop) */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      {employee.skills.slice(0, 2).map((skill, index) => (
                    <span
                      key={index}
                      className="bg-zinc-800 text-xs px-2 py-0.5 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                      {employee.skills.length > 2 && (
                    <span className="bg-zinc-800 text-xs px-2 py-0.5 rounded-full">
                          +{employee.skills.length - 2}
                    </span>
                  )}
                    </div>
                    {/* Rating (always show) */}
                    <div className="flex items-center gap-1 text-xs text-yellow-400 mb-2">
                      <Star className="h-4 w-4" />
                      <span>{employee.rating} rating</span>
                    </div>
                  </div>
                </div>
            </Link>
          ))}
        </div>
      </div>
      )}
      {/* Show message when no results found */}
      {activeTab === "freelancers" && filteredEmployees.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No contributors found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms or filters to find what you're
              looking for.
            </p>
          </div>
        </div>
      )}
      {activeTab === "gigs" && filteredGigs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No gigs found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters or post a new gig to get started.
            </p>
          </div>
        </div>
      )}
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}
