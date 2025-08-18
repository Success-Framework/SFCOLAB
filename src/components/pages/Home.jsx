import {
  BriefcaseBusiness,
  CheckCheck,
  LocateIcon,
  User,
  List,
  Calendar,
  Clock,
  ArrowUpRight,
  Users,
  Building2,
  MapPin,
  Target,
  MessageCircle,
  DollarSign,
  Briefcase,
} from "lucide-react";
import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import FilterHeader from "../headers/HomeHeader";
// import Options from "../sections/Options";
import ScrollToTop from "../sections/ScrollToTop";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedStage, setSelectedStage] = useState("All Stages");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [showKYCModal, setShowKYCModal] = useState(false);
  const [selectedFundingStatus, setSelectedFundingStatus] = useState("All Funding Status");
  const [hiringNow, setHiringNow] = useState(false);
  const navigate = useNavigate();

  const getStageColor = (stage) => {
    const colors = {
      "IDEA Stage": "bg-blue-600",
      "MVP Stage": "bg-yellow-600",
      "Growth Stage": "bg-green-600",
      "Scale Stage": "bg-purple-600",
      "Research Stage": "bg-red-600",
    };
    return colors[stage] || "bg-gray-600";
  };

  // Helper to get funding status from budget (for demo)
  const getFundingStatus = (budget) => {
    if (!budget || budget === "$0" || budget === "0") return "Not Funded";
    if (budget.includes("Seed")) return "Seed";
    if (budget.includes("Series A")) return "Series A";
    if (budget.includes("Series B")) return "Series B";
    if (parseInt(budget.replace(/[^0-9]/g, "")) > 0) return "Funded";
    return "Not Funded";
  };

  const cardContent = [
    {
      id: 1,
      header: "ABC - Marketing side",
      content: `ABC is an application for parents, to make their life easier by helping them organize and track each task. Now we're looking for effective marketers. We are leaning towards female market.`,
      people: "10",
      technology: "Technology",
      location: "New York",
      createdAt: "March 6, 2024",
      tasks: "5 Tasks",
      stage: "IDEA Stage",
      description: `ABC is a comprehensive parenting app designed to simplify the lives of busy parents. Our platform helps parents organize their daily tasks, track their children's activities, and manage family schedules efficiently.`,
      requirements: [
        "Experience in digital marketing",
        "Understanding of parenting market",
        "Strong communication skills",
      ],
      team: [
        {
          name: "John Doe",
          role: "Project Lead",
          avatar: "https://i.pravatar.cc/150?img=1",
        },
      ],
      metrics: {
        progress: "25%",
        deadline: "3 months",
        budget: "$50K",
      },
    },
    {
      id: 2,
      header: "XYZ - Tech Development",
      content: `XYZ is a cutting-edge tech platform revolutionizing how businesses handle data. We're seeking experienced developers to join our growing team.`,
      people: "8",
      technology: "Technology",
      location: "San Francisco",
      createdAt: "March 5, 2024",
      tasks: "3 Tasks",
      stage: "MVP Stage",
      description: `XYZ is a data management platform that helps businesses streamline their operations and make data-driven decisions.`,
      requirements: [
        "Full-stack development experience",
        "Cloud platform knowledge",
        "Agile methodology expertise",
      ],
      team: [
        {
          name: "Jane Smith",
          role: "Tech Lead",
          avatar: "https://i.pravatar.cc/150?img=2",
        },
      ],
      metrics: {
        progress: "40%",
        deadline: "6 months",
        budget: "$75K",
      },
    },
    {
      id: 3,
      header: "HealthTech Solutions",
      content: `Revolutionizing healthcare through technology. We're building a platform that connects patients with healthcare providers seamlessly.`,
      people: "12",
      technology: "Healthcare",
      location: "Boston",
      createdAt: "March 4, 2024",
      tasks: "7 Tasks",
      stage: "Growth Stage",
      description: `HealthTech Solutions is a healthcare platform that bridges the gap between patients and healthcare providers through innovative technology.`,
      requirements: [
        "Healthcare industry experience",
        "UI/UX design skills",
        "Mobile app development",
      ],
      team: [
        {
          name: "Mike Johnson",
          role: "Product Manager",
          avatar: "https://i.pravatar.cc/150?img=3",
        },
      ],
      metrics: {
        progress: "60%",
        deadline: "9 months",
        budget: "$100K",
      },
    },
  ];

  // Add funding status options
  const fundingStatuses = ["All Funding Status", "Pre-Seed", "Seed", "Series A", "Series B", "Bootstrapped", "Funded", "Not Funded"];

  // Filter projects based on search query and filters
  const filteredProjects = useMemo(() => {
    return cardContent.filter((project) => {
      // Search query filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        project.header.toLowerCase().includes(searchLower) ||
        project.content.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.technology.toLowerCase().includes(searchLower) ||
        project.location.toLowerCase().includes(searchLower) ||
        project.stage.toLowerCase().includes(searchLower) ||
        project.people.toLowerCase().includes(searchLower) ||
        project.tasks.toLowerCase().includes(searchLower) ||
        project.createdAt.toLowerCase().includes(searchLower) ||
        project.team.some(
          (member) =>
            member.name.toLowerCase().includes(searchLower) ||
            member.role.toLowerCase().includes(searchLower)
        ) ||
        project.requirements.some((req) =>
          req.toLowerCase().includes(searchLower)
        ) ||
        Object.values(project.metrics).some((value) =>
          value.toLowerCase().includes(searchLower)
        );

      // Location filter
      const matchesLocation =
        selectedLocation === "All Locations" ||
        project.location === selectedLocation;

      // Stage filter
      const matchesStage =
        selectedStage === "All Stages" || project.stage === selectedStage;

      // Industry/Technology filter
      const matchesIndustry =
        selectedIndustry === "All Industries" ||
        project.technology === selectedIndustry;

      // Funding status filter (using budget as a proxy for now)
      const matchesFundingStatus =
        selectedFundingStatus === "All Funding Status" ||
        (selectedFundingStatus === "Funded" && parseInt(project.metrics.budget.replace(/[^0-9]/g, "")) > 0) ||
        (selectedFundingStatus === "Not Funded" && parseInt(project.metrics.budget.replace(/[^0-9]/g, "")) === 0) ||
        (project.metrics.budget && project.metrics.budget.toLowerCase().includes(selectedFundingStatus.toLowerCase()));
      // Hiring now filter (roles open > 0)
      const matchesHiringNow = !hiringNow || (parseInt(project.people) > 0);

      return (
        matchesSearch && matchesLocation && matchesStage && matchesIndustry && matchesFundingStatus && matchesHiringNow
      );
    });
  }, [searchQuery, selectedLocation, selectedStage, selectedIndustry, selectedFundingStatus, hiringNow]);

  return (
    <div className="min-h-screen bg-black">
      {/* Events Banner */}
      <div className="w-full bg-gradient-to-r from-purple-700 via-blue-800 to-indigo-900 p-4 flex flex-col sm:flex-row items-center justify-between rounded-lg mb-4 shadow-lg gap-3 sm:gap-0">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
          <Calendar className="text-yellow-400" size={24} />
          <span className="text-white font-semibold text-base sm:text-lg text-center">Upcoming Events: Ideathon & Hackathon</span>
        </div>
        <button
          className="w-full sm:w-auto mt-2 sm:mt-0 bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          onClick={() => navigate("/ideation")}
        >
          View Events
        </button>
      </div>
      {/* AI Matchmaking Widget (placeholder) */}
      <div className="w-full bg-[#1A1A1A] p-4 rounded-lg mb-4 flex flex-col sm:flex-row items-center justify-between shadow-md gap-3 sm:gap-0">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
          <User className="text-blue-400" size={20} />
          <span className="text-white font-semibold text-base">AI Matchmaking</span>
          <span className="text-gray-400 text-xs sm:text-sm hidden sm:inline">Let our AI suggest teammates, mentors, or investors for you!</span>
        </div>
        <button className="w-full sm:w-auto mt-2 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">Get Suggestions</button>
      </div>
      {/* Filters Row (add Funding Status and Hiring Now) */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 items-stretch sm:items-center mb-4 px-2 sm:px-4">
      <FilterHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        selectedStage={selectedStage}
        setSelectedStage={setSelectedStage}
        selectedIndustry={selectedIndustry}
        setSelectedIndustry={setSelectedIndustry}
      />
        {/* Funding Status Filter */}
        <div className="relative w-full sm:w-auto">
          <select
            value={selectedFundingStatus}
            onChange={e => setSelectedFundingStatus(e.target.value)}
            className="w-full sm:w-auto bg-[#232323] border border-[#444] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none shadow-sm transition-colors"
            style={{ minWidth: 180 }}
          >
            {fundingStatuses.map(status => (
              <option key={status} value={status} className="bg-[#232323] text-white">{status}</option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <DollarSign size={16} />
          </span>
        </div>
        {/* Hiring Now Toggle */}
        <label className="flex items-center gap-2 cursor-pointer select-none w-full sm:w-auto px-2 py-2 bg-[#232323] rounded-lg border border-[#444] shadow-sm transition-colors">
          <input
            type="checkbox"
            checked={hiringNow}
            onChange={e => setHiringNow(e.target.checked)}
            className="accent-blue-600 h-4 w-4 rounded focus:ring-2 focus:ring-blue-500 border border-gray-600 bg-[#232323]"
          />
          <Briefcase size={16} className="text-blue-400" />
          <span className="text-white text-sm">Hiring Now</span>
        </label>
        {/* Create Startup Button */}
        <button
          className="w-full sm:w-auto sm:ml-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold shadow mt-2 sm:mt-0"
          onClick={() => setShowKYCModal(true)}
        >
          + Create Startup
        </button>
      </div>
      {/* KYC/Token Modal (placeholder) */}
      {showKYCModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#232323] rounded-2xl p-8 max-w-md w-full shadow-lg relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-white" onClick={() => setShowKYCModal(false)}>&times;</button>
            <h2 className="text-xl font-bold text-white mb-4">KYC & Token Buy-In Required</h2>
            <p className="text-gray-300 mb-4">To create a startup, please complete KYC verification and purchase a token. (This is a placeholder. Integrate with your KYC/token system.)</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold w-full">Start KYC Process</button>
          </div>
        </div>
      )}
      {/* <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-4'> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-4 max-sm:p-0">
        {filteredProjects.map((content) => (
          <Link
            key={content.id}
            to={`/home-details?id=${content.id}`}
            className="bg-[#232323] rounded-4xl h-full hover:bg-[#2a2a2a] transition-colors duration-200"
          >
            <div className="w-full h-full p-2 max-sm:p-1">
              <div className="bg-[#1A1A1A] flex-1 items-center justify-center min-h-[330px] rounded-4xl p-7 space-y-6 max-sm:p-4">
                {/* header */}
                <div className="flex w-full justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-zinc-700">
                      <img
                        src={content.team[0].avatar}
                        alt={content.team[0].name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h1 className="text-lg font-bold max-sm:text-base">
                      {content.header}
                    </h1>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                  <button
                    className={`${getStageColor(
                      content.stage
                      )} text-xs max-sm:text-[10px] px-2 py-1 font-medium rounded-full mb-1`}
                  >
                    {content.stage}
                  </button>
                    {/* Funding Status Badge */}
                    <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-[#232323] border border-blue-700 text-blue-400 font-semibold">
                      <DollarSign size={14} />
                      {getFundingStatus(content.metrics.budget)}
                    </span>
                    {/* Hiring Now Badge */}
                    {parseInt(content.people) > 0 && (
                      <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-700 text-white font-semibold mt-1 animate-pulse">
                        <Briefcase size={14} /> Hiring Now
                      </span>
                    )}
                  </div>
                </div>
                {/* Funding Meter */}
                <div className="w-full mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Funding:</span>
                    <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: content.metrics.progress }}
                      ></div>
                    </div>
                    <span className="text-xs text-white font-semibold">{content.metrics.progress}</span>
                  </div>
                </div>

                {/* content */}
                <div className="text-sm font leading-relaxed text-[#C4C4C4] line-clamp-3">
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

                {/* roles */}
                <div className="grid grid-cols-2 font-medium text-[#C4C4C4] gap-4">
                  <div className="space-y-3">
                    <p className="flex items-center gap-2 text-sm">
                      <Users size={18} className="text-blue-500" />
                      <span>{content.people} Roles</span>
                    </p>
                    <p className="flex items-center gap-2 text-sm">
                      <Building2 size={18} className="text-green-500" />
                      <span>{content.technology}</span>
                    </p>
                    <p className="flex items-center gap-2 text-sm">
                      <MapPin size={18} className="text-red-500" />
                      <span>{content.location}</span>
                    </p>
                  </div>
                  <div className="space-y-3">
                    <p className="flex items-center gap-2 text-sm">
                      <CheckCheck size={18} className="text-purple-500" />
                      <span>{content.tasks}</span>
                    </p>
                    <p className="flex items-center gap-2 text-sm">
                      <Calendar size={18} className="text-yellow-500" />
                      <span>{content.createdAt}</span>
                    </p>
                    <p className="flex items-center gap-2 text-sm text-blue-500">
                      <Target size={18} />
                      <span>View Details</span>
                      <ArrowUpRight size={14} />
                    </p>
                  </div>
                </div>

                {/* team */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <img
                      src={content.team[0].avatar}
                      alt={content.team[0].name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium">
                        {content.team[0].name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {content.team[0].role}
                      </p>
                    </div>
                  </div>
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

      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Fixed Chat Button */}
      <Link
        className="fixed bottom-6 right-6 w-14 h-14 bg-gray-600 hover:bg-gray-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-50 max-sm:hidden"
        to="/messages"
      >
        <MessageCircle size={24} />
      </Link>
    </div>
  );
};

export default Home;
