import React, { useState, useMemo } from "react";
import StartUpHeader from "../headers/StartUpHeader";
import { Link } from "react-router-dom";
// import Options from "../sections/Options";
import ScrollToTop from "../sections/ScrollToTop";
import {
  Users,
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  Target,
  ArrowUpRight,
} from "lucide-react";

const StartUp = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [selectedStage, setSelectedStage] = useState("All Stages");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");

  const getStageColor = (stage) => {
    const colors = {
      "MVP Stage": "bg-yellow-600",
      "Growth Stage": "bg-green-600",
      "Scale Stage": "bg-blue-600",
      "Seed Stage": "bg-purple-600",
      "Series A": "bg-red-600",
    };
    return colors[stage] || "bg-gray-600";
  };

  const startupContent = [
    {
      id: 1,
      name: "TechVision AI",
      description:
        "Revolutionary AI platform for predictive analytics in healthcare. Using machine learning to improve patient outcomes and reduce healthcare costs.",
      industry: "Healthcare",
      stage: "Growth Stage",
      location: "San Francisco",
      teamSize: "25",
      founded: "2022",
      funding: "$5M",
      metrics: {
        users: "10K+",
        accuracy: "95%",
        hospitals: "50+",
      },
      logo: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "GreenEnergy Solutions",
      description:
        "Innovative renewable energy solutions for residential and commercial properties. Making sustainable energy accessible and affordable.",
      industry: "Energy",
      stage: "MVP Stage",
      location: "Berlin",
      teamSize: "15",
      founded: "2023",
      funding: "$2M",
      metrics: {
        installations: "500+",
        savings: "30%",
        customers: "1K+",
      },
      logo: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      name: "EduTech Pro",
      description:
        "Next-generation learning platform using AI to personalize education. Helping students achieve better results through adaptive learning.",
      industry: "Education",
      stage: "Scale Stage",
      location: "London",
      teamSize: "40",
      founded: "2021",
      funding: "$8M",
      metrics: {
        students: "50K+",
        schools: "200+",
        improvement: "40%",
      },
      logo: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 4,
      name: "FinTech Innovators",
      description:
        "Disrupting traditional banking with blockchain technology. Making financial services more accessible and secure for everyone.",
      industry: "Finance",
      stage: "Growth Stage",
      location: "Singapore",
      teamSize: "30",
      founded: "2022",
      funding: "$6M",
      metrics: {
        transactions: "1M+",
        users: "100K+",
        security: "99.9%",
      },
      logo: "https://i.pravatar.cc/150?img=4",
    },
  ];

  // Add a cover image for each startup (mock for now)
  const coverImages = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  ];
  // Funding breakdown mock for each card
  const fundingStages = [
    { stage: "Seed", amount: 1000000 },
    { stage: "Series A", amount: 3000000 },
    { stage: "Goal", amount: 8000000 },
  ];

  // Filter startups based on search query and filters
  const filteredStartups = useMemo(() => {
    return startupContent.filter((startup) => {
      // Search query filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        startup.name.toLowerCase().includes(searchLower) ||
        startup.description.toLowerCase().includes(searchLower) ||
        startup.industry.toLowerCase().includes(searchLower) ||
        startup.location.toLowerCase().includes(searchLower) ||
        startup.stage.toLowerCase().includes(searchLower) ||
        startup.funding.toLowerCase().includes(searchLower) ||
        startup.teamSize.toLowerCase().includes(searchLower) ||
        startup.founded.toLowerCase().includes(searchLower) ||
        Object.values(startup.metrics).some((value) =>
          value.toLowerCase().includes(searchLower)
        );

      // Industry filter
      const matchesIndustry =
        selectedIndustry === "All Industries" ||
        startup.industry === selectedIndustry;

      // Stage filter
      const matchesStage =
        selectedStage === "All Stages" || startup.stage === selectedStage;

      // Location filter
      const matchesLocation =
        selectedLocation === "All Locations" ||
        startup.location === selectedLocation;

      return (
        matchesSearch && matchesIndustry && matchesStage && matchesLocation
      );
    });
  }, [searchQuery, selectedIndustry, selectedStage, selectedLocation]);

  return (
    <div className="min-h-screen bg-black">
      {/* <Options /> */}
      <StartUpHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedIndustry={selectedIndustry}
        setSelectedIndustry={setSelectedIndustry}
        selectedStage={selectedStage}
        setSelectedStage={setSelectedStage}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-7 p-4 max-sm:p-0">
        {filteredStartups.map((startup, idx) => (
          <Link
            key={startup.id}
            to={`/startup-details?id=${startup.id}`}
            className="group bg-[#18181A] rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col relative min-h-[340px] hover:scale-[1.025] focus:scale-[1.025] focus:outline-none"
            style={{ minHeight: 340 }}
          >
            {/* Cover Image with gradient overlay */}
            <div className="relative w-full h-32 sm:h-36">
              <img src={coverImages[idx % coverImages.length]} alt="cover" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              {/* Badges */}
              <div className="absolute top-3 left-3 flex gap-2 z-10">
                <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">{startup.industry}</span>
                <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">{startup.stage}</span>
                    </div>
              {/* Logo - overlaps cover */}
              <div className="absolute left-4 -bottom-7 z-20">
                <div className="h-14 w-14 rounded-full border-4 border-[#18181A] bg-zinc-800 overflow-hidden shadow-lg">
                  <img src={startup.logo} alt={startup.name} className="h-full w-full object-cover" />
                </div>
                </div>
                      </div>
            {/* Card Content */}
            <div className="flex-1 flex flex-col justify-between pt-10 pb-4 px-4">
              {/* Name & One-liner */}
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-white mb-1 line-clamp-1">{startup.name}</h1>
                <p className="text-xs sm:text-sm text-gray-300 mb-3 line-clamp-2">{startup.description}</p>
                </div>
              {/* Meta: Location & Team */}
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <MapPin size={14} /> {startup.location}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Users size={14} /> {startup.teamSize} team
                </span>
                  </div>
              {/* View Details Button */}
              <div className="flex justify-end">
                <span className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-full shadow transition-colors">
                  View Details <ArrowUpRight size={14} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Show message when no results found */}
      {filteredStartups.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No startups found
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
    </div>
  );
};

export default StartUp;
