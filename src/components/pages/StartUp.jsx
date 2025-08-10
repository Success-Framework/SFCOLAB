import React, { useState, useMemo } from "react";
import StartUpHeader from "../headers/StartUpHeader";
import { Link } from "react-router-dom";
import Options from "../sections/Options";
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
      <Options />
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 p-4 max-sm:p-0">
        {filteredStartups.map((startup) => (
          <Link 
            key={startup.id} 
            to={`/startup-details?id=${startup.id}`} 
            className="bg-[#232323] rounded-4xl h-full hover:bg-[#2A2A2A] transition-colors"
          >
            <div className="w-full h-full p-2 max-sm:p-1">
              <div className="bg-[#1A1A1A] flex-1 items-center justify-center min-h-[330px] rounded-4xl p-7 space-y-6 max-sm:p-5">
                {/* header */}
                <div className="flex w-full justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-zinc-700">
                      <img
                        src={startup.logo}
                        alt={startup.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h1 className="text-lg max-sm:text-base font-bold">
                      {startup.name}
                    </h1>
                  </div>
                  <button
                    className={`${getStageColor(
                      startup.stage
                    )} text-xs max-sm:text-[10px] px-2 py-1 font-medium rounded-full`}
                  >
                    {startup.stage}
                  </button>
                </div>

                {/* content */}
                <div className="text-sm font-medium max-sm:font-normal leading-relaxed text-[#C4C4C4] line-clamp-3">
                  {startup.description}
                </div>

                {/* metrics */}
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(startup.metrics).map(
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

                {/* metadata */}
                <div className="grid grid-cols-2 font-medium text-[#C4C4C4] gap-4">
                  <div className="space-y-3">
                    <p className="flex items-center gap-2 text-sm">
                      <Users size={18} className="text-blue-500" />
                      <span>{startup.teamSize} Team</span>
                    </p>
                    <p className="flex items-center gap-2 text-sm">
                      <Building2 size={18} className="text-green-500" />
                      <span>{startup.industry}</span>
                    </p>
                    <p className="flex items-center gap-2 text-sm">
                      <MapPin size={18} className="text-red-500" />
                      <span>{startup.location}</span>
                    </p>
                  </div>
                  <div className="space-y-3">
                    <p className="flex items-center gap-2 text-sm">
                      <Calendar size={18} className="text-purple-500" />
                      <span>Founded {startup.founded}</span>
                    </p>
                    <p className="flex items-center gap-2 text-sm text-green-500">
                      <DollarSign size={18} />
                      <span>{startup.funding} Raised</span>
                    </p>
                    <p className="flex items-center gap-2 text-sm text-blue-500">
                      <Target size={18} />
                      <span>View Details</span>
                      <ArrowUpRight size={14} />
                    </p>
                  </div>
                </div>
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
