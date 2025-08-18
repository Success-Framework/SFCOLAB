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
import React, { useState, useMemo, useEffect } from "react";
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

  // Voting state for each idea (local only)
  const [votes, setVotes] = useState({});
  // Premium posting modal state
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [premiumIdeaPayload, setPremiumIdeaPayload] = useState(null);
  // Events tab state
  const [activeEventTab, setActiveEventTab] = useState("ideathon");
  // Countdown for event (mock)
  const [countdown, setCountdown] = useState(3600 * 24 * 2 + 3600 * 5 + 60 * 30); // 2d 5h 30m
  
  // Hackathon specific states
  const [hackathonTeams, setHackathonTeams] = useState([
    {
      id: 1,
      name: "Team Alpha",
      description: "Looking for AI developers and UI/UX designers",
      skills: ["AI", "UI/UX"],
      currentSize: 2,
      maxSize: 6,
      members: ["John Doe", "Jane Smith"]
    },
    {
      id: 2,
      name: "GreenTech Squad",
      description: "Sustainability focused team, need backend devs",
      skills: ["Backend", "DevOps"],
      currentSize: 4,
      maxSize: 6,
      members: ["Mike Chen", "Sarah Lee", "Alex Kim", "Tom Wilson"]
    }
  ]);
  
  const [hackathonProjects, setHackathonProjects] = useState([
    {
      id: 1,
      title: "EcoAI Monitor",
      description: "AI-powered environmental monitoring system",
      team: "GreenTech Squad",
      status: "Submitted",
      votes: 45,
      percentage: 75,
      submittedAt: "2 hours ago",
      githubUrl: "https://github.com/greentech/ecoai-monitor",
      demoUrl: "https://demo.ecoai-monitor.com"
    },
    {
      id: 2,
      title: "SmartCity Hub",
      description: "Urban planning optimization platform",
      team: "Team Alpha",
      status: "In Review",
      votes: 32,
      percentage: 53,
      submittedAt: "5 hours ago",
      githubUrl: "https://github.com/teamalpha/smartcity-hub",
      demoUrl: null
    }
  ]);
  
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [newTeam, setNewTeam] = useState({ name: "", description: "", maxSize: 6 });
  const [newProject, setNewProject] = useState({ title: "", description: "", githubUrl: "", demoUrl: "" });
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);
  const formatCountdown = (s) => {
    const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    return `${d}d ${h}h ${m}m ${sec}s`;
  };

  const handleCreateIdea = (payload) => {
    if (payload.premium) {
      setShowPremiumModal(true);
      setPremiumIdeaPayload(payload);
      return;
    }
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

  const handlePremiumConfirm = () => {
    if (premiumIdeaPayload) {
      const now = new Date();
      const newIdea = {
        id: Date.now(),
        title: premiumIdeaPayload.title,
        description: premiumIdeaPayload.description,
        createdAt: now.toISOString(),
        timeAgo: "just now",
        stage: premiumIdeaPayload.stage,
        category: premiumIdeaPayload.industry,
        tags: premiumIdeaPayload.tags,
        likes: 0,
        comments: 0,
        collaborators: 1,
        author: {
          name: "You",
          role: "Contributor (Premium)",
          avatar: "https://i.pravatar.cc/150?img/11",
        },
        premium: true,
      };
      setIdeas((prev) => [newIdea, ...prev]);
      setSortBy("latest");
      setSearchQuery("");
      setShowPremiumModal(false);
      setPremiumIdeaPayload(null);
    }
  };
  
  // Hackathon handlers
  const handleJoinTeam = (teamId) => {
    setHackathonTeams(prev => prev.map(team => 
      team.id === teamId 
        ? { ...team, currentSize: Math.min(team.currentSize + 1, team.maxSize) }
        : team
    ));
    alert("Successfully joined the team!");
  };
  
  const handleCreateTeam = () => {
    if (newTeam.name && newTeam.description) {
      const team = {
        id: Date.now(),
        name: newTeam.name,
        description: newTeam.description,
        skills: [],
        currentSize: 1,
        maxSize: newTeam.maxSize,
        members: ["You"]
      };
      setHackathonTeams(prev => [team, ...prev]);
      setNewTeam({ name: "", description: "", maxSize: 6 });
      setShowTeamModal(false);
      alert("Team created successfully!");
    }
  };
  
  const handleSubmitProject = () => {
    if (newProject.title && newProject.description && newProject.githubUrl) {
      const project = {
        id: Date.now(),
        title: newProject.title,
        description: newProject.description,
        team: "Your Team",
        status: "Submitted",
        votes: 0,
        percentage: 0,
        submittedAt: "just now",
        githubUrl: newProject.githubUrl,
        demoUrl: newProject.demoUrl
      };
      setHackathonProjects(prev => [project, ...prev]);
      setNewProject({ title: "", description: "", githubUrl: "", demoUrl: "" });
      setShowProjectModal(false);
      alert("Project submitted successfully!");
    }
  };
  
  const handleVoteProject = (projectId) => {
    setHackathonProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, votes: project.votes + 1, percentage: Math.min(100, ((project.votes + 1) / 100) * 100) }
        : project
    ));
    alert("Vote recorded! Thank you for participating.");
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

      {/* Events Tab */}
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 pt-4 mb-4">
        <div className="flex gap-2 mb-2">
          <button
            className={`px-4 py-2 rounded-t-lg font-semibold text-sm ${activeEventTab === "ideathon" ? "bg-blue-600 text-white" : "bg-[#232323] text-gray-300"}`}
            onClick={() => setActiveEventTab("ideathon")}
          >
            Ideathon
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg font-semibold text-sm ${activeEventTab === "hackathon" ? "bg-purple-600 text-white" : "bg-[#232323] text-gray-300"}`}
            onClick={() => setActiveEventTab("hackathon")}
          >
            Hackathon
          </button>
        </div>
        <div className="bg-[#18181A] rounded-b-2xl rounded-tr-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow">
          {activeEventTab === "ideathon" ? (
            <>
              <div>
                <h3 className="text-lg font-bold text-blue-400 mb-1">Ideathon: "Innovate for Impact"</h3>
                <div className="text-xs text-gray-300 mb-1">Prize: $5,000 + Fast-track to Startup Profile</div>
                <div className="text-xs text-gray-400">Theme: Social Good | Dates: May 20–25, 2024</div>
                <div className="text-xs text-gray-400">Rules: Submit original ideas, no plagiarism, team size 1–5.</div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs text-gray-400">Time left:</span>
                <span className="text-lg font-bold text-blue-400">{formatCountdown(countdown)}</span>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className="text-lg font-bold text-purple-400 mb-1">Hackathon: "Build for the Future"</h3>
                <div className="text-xs text-gray-300 mb-1">Prize: $10,000 + Jury Award</div>
                <div className="text-xs text-gray-400">Theme: AI & Sustainability | Dates: June 10–15, 2024</div>
                <div className="text-xs text-gray-400">Rules: Build in 5 days, open source, team size 2–6.</div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs text-gray-400">Time left:</span>
                <span className="text-lg font-bold text-purple-400">{formatCountdown(countdown)}</span>
              </div>
            </>
          )}
        </div>
        
        {/* Ideathon Content */}
        {activeEventTab === "ideathon" && (
          <div className="mt-4 space-y-4">
            <div className="bg-[#232323] rounded-xl p-4">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-blue-400" />
                Submit Your Idea
              </h4>
              <div className="bg-[#18181A] rounded-lg p-4">
                <p className="text-gray-300 text-sm mb-3">
                  Share your innovative idea for the Ideathon. The best ideas will be fast-tracked to startup profiles!
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Submit Idea
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Hackathon Content */}
        {activeEventTab === "hackathon" && (
          <div className="mt-4 space-y-4">
            {/* Team Builder Section */}
            <div className="bg-[#232323] rounded-xl p-4">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-400" />
                Team Builder
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#18181A] rounded-lg p-4">
                  <h5 className="font-medium text-white mb-2">Join a Team</h5>
                  <div className="space-y-2">
                    {hackathonTeams.map(team => (
                      <div key={team.id} className="bg-[#2B2D31] rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-white">{team.name}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            team.currentSize < team.maxSize ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                          }`}>
                            {team.currentSize}/{team.maxSize} spots
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mb-2">{team.description}</p>
                        <div className="flex gap-1 mb-2">
                          {team.skills.map((skill, index) => (
                            <span key={index} className="text-xs bg-purple-600/20 text-purple-400 px-2 py-1 rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                        <button 
                          className={`w-full text-xs py-2 rounded-lg transition-colors ${
                            team.currentSize < team.maxSize 
                              ? 'bg-purple-600 text-white hover:bg-purple-700' 
                              : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                          }`}
                          disabled={team.currentSize >= team.maxSize}
                          onClick={() => handleJoinTeam(team.id)}
                        >
                          {team.currentSize >= team.maxSize ? 'Team Full' : 'Join Team'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-[#18181A] rounded-lg p-4">
                  <h5 className="font-medium text-white mb-2">Create Your Team</h5>
                  <div className="space-y-3">
                    <input 
                      type="text" 
                      placeholder="Team Name" 
                      value={newTeam.name}
                      onChange={(e) => setNewTeam({...newTeam, name: e.target.value})}
                      className="w-full bg-[#2B2D31] text-white text-sm px-3 py-2 rounded-lg border-none focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                    <textarea 
                      placeholder="Team Description & Skills Needed" 
                      value={newTeam.description}
                      onChange={(e) => setNewTeam({...newTeam, description: e.target.value})}
                      rows={3}
                      className="w-full bg-[#2B2D31] text-white text-sm px-3 py-2 rounded-lg border-none focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
                    />
                    <div className="flex gap-2">
                      <input 
                        type="number" 
                        min="2"
                        max="6"
                        placeholder="Max Team Size (2-6)" 
                        value={newTeam.maxSize}
                        onChange={(e) => setNewTeam({...newTeam, maxSize: parseInt(e.target.value) || 6})}
                        className="flex-1 bg-[#2B2D31] text-white text-sm px-3 py-2 rounded-lg border-none focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      />
                      <button 
                        className="bg-purple-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                        onClick={handleCreateTeam}
                      >
                        Create Team
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Project Submissions */}
            <div className="bg-[#232323] rounded-xl p-4">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-400" />
                Project Submissions
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#18181A] rounded-lg p-4">
                  <h5 className="font-medium text-white mb-2">Submit Your Project</h5>
                  <div className="space-y-3">
                    <input 
                      type="text" 
                      placeholder="Project Title" 
                      value={newProject.title}
                      onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                      className="w-full bg-[#2B2D31] text-white text-sm px-3 py-2 rounded-lg border-none focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                    <textarea 
                      placeholder="Project Description" 
                      value={newProject.description}
                      onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                      rows={3}
                      className="w-full bg-[#2B2D31] text-white text-sm px-3 py-2 rounded-lg border-none focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
                    />
                    <input 
                      type="url" 
                      placeholder="GitHub Repository URL" 
                      value={newProject.githubUrl}
                      onChange={(e) => setNewProject({...newProject, githubUrl: e.target.value})}
                      className="w-full bg-[#2B2D31] text-white text-sm px-3 py-2 rounded-lg border-none focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                    <input 
                      type="url" 
                      placeholder="Demo Video URL (optional)" 
                      value={newProject.demoUrl}
                      onChange={(e) => setNewProject({...newProject, demoUrl: e.target.value})}
                      className="w-full bg-[#2B2D31] text-white text-sm px-3 py-2 rounded-lg border-none focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                    <button 
                      className="w-full bg-purple-600 text-white text-sm py-2 rounded-lg hover:bg-purple-700 transition-colors"
                      onClick={handleSubmitProject}
                    >
                      Submit Project
                    </button>
                  </div>
                </div>
                
                <div className="bg-[#18181A] rounded-lg p-4">
                  <h5 className="font-medium text-white mb-2">Recent Submissions</h5>
                  <div className="space-y-2">
                    {hackathonProjects.map(project => (
                      <div key={project.id} className="bg-[#2B2D31] rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-white">{project.title}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            project.status === 'Submitted' ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mb-2">{project.description}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>Team: {project.team}</span>
                          <span>• {project.submittedAt}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Voting & Leaderboard */}
            <div className="bg-[#232323] rounded-xl p-4">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-purple-400" />
                Voting & Leaderboard
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#18181A] rounded-lg p-4">
                  <h5 className="font-medium text-white mb-2">Public Voting</h5>
                  <div className="space-y-3">
                    {hackathonProjects.map(project => (
                      <div key={project.id} className="bg-[#2B2D31] rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-white">{project.title}</span>
                          <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">{project.votes} votes</span>
                        </div>
                        <div className="w-full bg-[#40444B] rounded-full h-2 mb-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{width: `${project.percentage}%`}}></div>
                        </div>
                        <button 
                          className="w-full bg-purple-600 text-white text-xs py-2 rounded-lg hover:bg-purple-700 transition-colors"
                          onClick={() => handleVoteProject(project.id)}
                        >
                          Vote for Project
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-[#18181A] rounded-lg p-4">
                  <h5 className="font-medium text-white mb-2">Current Leaderboard</h5>
                  <div className="space-y-2">
                    {hackathonProjects
                      .sort((a, b) => b.percentage - a.percentage)
                      .map((project, index) => (
                        <div key={project.id} className="flex items-center justify-between p-2 bg-[#2B2D31] rounded-lg">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold">
                              {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                            </span>
                            <span className="text-sm font-medium text-white">{project.title}</span>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            index === 0 ? 'bg-yellow-600 text-white' : 
                            index === 1 ? 'bg-gray-300 text-black' : 
                            index === 2 ? 'bg-amber-600 text-white' : 'bg-purple-600 text-white'
                          }`}>
                            {project.percentage}%
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* AI Matchmaking Widget */}
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 mb-4">
        <div className="bg-[#18181A] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow">
          <div className="flex items-center gap-3">
            <Users className="text-blue-400" size={22} />
            <span className="text-white font-semibold">AI Matchmaking</span>
            <span className="text-gray-400 text-xs sm:text-sm">Suggested mentors and advisors for your idea development!</span>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">Get Suggestions</button>
        </div>
      </div>
      {/* Premium Posting Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="bg-[#18181A] rounded-2xl p-8 max-w-lg w-full shadow-xl border border-white/10">
            <h2 className="text-xl font-bold mb-4 text-white">Premium Idea Posting</h2>
            <p className="text-gray-300 mb-4 text-sm">Premium posting requires a token buy-in. This will highlight your idea and give it priority in the Ideathon/Hackathon.</p>
            <div className="bg-[#232323] rounded-lg p-4 text-xs text-gray-400 mb-4">Token required: <span className="text-green-400 font-bold">1 SFC Token</span></div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors" onClick={handlePremiumConfirm}>
              Buy Token & Post Idea
            </button>
            <button className="w-full mt-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-2 rounded-lg transition-colors" onClick={() => setShowPremiumModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

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
                {/* +1 Voting */}
                <div className="flex items-center justify-center pt-2">
                  <button
                    className={`px-3 py-1 rounded-full text-xs font-semibold mr-2 ${votes[content.id] ? 'bg-green-600 text-white' : 'bg-white/10 text-green-400 hover:bg-green-600 hover:text-white transition-colors'}`}
                    disabled={votes[content.id]}
                    onClick={e => { e.preventDefault(); setVotes({ ...votes, [content.id]: true }); }}
                  >
                    +1 Vote
                  </button>
                  <span className="text-green-400 font-bold">{(content.votes || 0) + (votes[content.id] ? 1 : 0)}</span>
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
