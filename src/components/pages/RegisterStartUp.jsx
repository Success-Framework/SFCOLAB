import React, { useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";

const StartupRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    location: "",
    description: "",
    stage: "",
    positions: "",
  });
  const [roles, setRoles] = useState([{ title: "", roleType: "" }]);
  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);

  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);
  const [showRoleTypeDropdown, setShowRoleTypeDropdown] = useState({});

  const industries = ["Technology", "Finance", "Healthcare", "Education"];
  const roleTypes = ["Co-Founder", "Advisor", "Investor", "Employee"];

  // helper to update inputs
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // add role
  const addRole = () => {
    if (roles.length < 100) {
      setRoles([...roles, { title: "", roleType: "" }]);
    }
  };

  // submit handler
  const handleRegister = async (e) => {
    e.preventDefault();

    // build JSON payload just like your example
    const payload = {
      name: (formData.name || "").trim(),
      industry: (formData.industry || "").trim(),
      location: (formData.location || "").trim(),
      description: (formData.description || "").trim(),
      stage: (formData.stage || "").trim(),
      positions: formData.positions ? String(formData.positions).trim() : "0",
      logo: (formData.logo || "").trim(),
      banner: (formData.banner || "").trim(),
      roles: roles.map((r) => ({
        title: (r.title || "").trim(),
        roleType: (r.roleType || "").trim(),
      })),
    };

    console.log("Submitting startup payload:", payload);

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("You must be logged in first.");
        return;
      }

      const res = await axios.post(
        "https://sfcollab-backend.onrender.com/api/startup/register",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Startup registered successfully:", res.data);

      // reset form state
      setFormData({
        name: "",
        industry: "",
        location: "",
        description: "",
        stage: "",
        positions: "",
      });
      setRoles([{ title: "", roleType: "" }]);
      setLogoFile(null);
      setBannerFile(null);

      alert("Startup registered successfully!");
    } catch (err) {
      console.error("Register error:", err.response?.data || err.message);
      if (err.response?.data) {
        alert(err.response.data.message || "Failed to register startup");
      } else {
        alert(err.message || "Failed to register startup");
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="p-4">
        <div className="md:text-3xl text-lg font-medium">
          Register New Startup
        </div>
      </div>

      {/* Hero */}
      <div className="relative md:h-[400px] h-48 mb-8">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img
          src="https://plus.unsplash.com/premium_photo-1749618351944-e251d669af21?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzN3x8fGVufDB8fHx8fA%3D%3D"
          alt="Mountain landscape"
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-2xl font-semibold text-white text-center">
            Create your start-up in Minutes
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 pb-8 space-y-6">
        {/* Name */}
        <div className="space-y-2">
          <div className="text-white text-sm">Start-up Name</div>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Enter startup name"
            className="w-full px-3 py-2 border border-gray-700 rounded-md text-white bg-black focus:outline-none focus:border-gray-600"
          />
        </div>

        {/* Industry and Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-white text-sm">Industry</div>
            <div className="relative">
              <div
                role="combobox"
                className="w-full px-3 py-2 border border-gray-700 rounded-md text-white bg-black focus:outline-none focus:border-gray-600 cursor-pointer"
                onClick={() => setShowIndustryDropdown(!showIndustryDropdown)}
              >
                <div className="flex justify-between items-center">
                  <span>{formData.industry || "Select Industry"}</span>
                  <span>▼</span>
                </div>
              </div>
              {showIndustryDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg">
                  {industries.map((industry) => (
                    <div
                      key={industry}
                      className="px-3 py-2 hover:bg-gray-700 cursor-pointer"
                      onClick={() => {
                        handleInputChange("industry", industry);
                        setShowIndustryDropdown(false);
                      }}
                    >
                      {industry}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-white text-sm">Location</div>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="Enter location"
              className="w-full px-3 py-2 border border-gray-700 rounded-md text-white bg-black focus:outline-none focus:border-gray-600"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="text-white text-sm">Startup Description</div>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Enter description"
            className="w-full px-3 py-2 border border-gray-700 rounded-md text-white bg-black focus:outline-none focus:border-gray-600 min-h-[100px]"
          />
        </div>

        {/* Stage */}
        <div className="space-y-4">
          <div className="text-white text-sm">Startup Stage</div>
          <div className="grid grid-cols-2 gap-4">
            {["idea", "seed", "early", "growth", "scale"].map((stage) => (
              <div
                key={stage}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="stage"
                  checked={formData.stage === stage}
                  onChange={() => handleInputChange("stage", stage)}
                />
                <div className="text-white text-sm capitalize">{stage}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Uploads (Links instead of files) */}
        <div className="space-y-4">
          <div className="text-white text-sm">
            Startup Logo & Banner (Links)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-white text-xs">Logo URL</div>
              <input
                type="url"
                value={formData.logo || ""}
                onChange={(e) => handleInputChange("logo", e.target.value)}
                placeholder="https://example.com/logo.png"
                className="w-full px-3 py-2 border border-gray-700 rounded-md text-white bg-black focus:outline-none focus:border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <div className="text-white text-xs">Banner URL</div>
              <input
                type="url"
                value={formData.banner || ""}
                onChange={(e) => handleInputChange("banner", e.target.value)}
                placeholder="https://example.com/banner.jpg"
                className="w-full px-3 py-2 border border-gray-700 rounded-md text-white bg-black focus:outline-none focus:border-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Roles */}
        <div className="space-y-4">
          <div className="text-white text-sm">Add role (up to 100)</div>
          {roles.map((role, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-white text-xs">Title</div>
                <input
                  type="text"
                  value={role.title}
                  onChange={(e) => {
                    const newRoles = [...roles];
                    newRoles[index].title = e.target.value;
                    setRoles(newRoles);
                  }}
                  placeholder="Role title"
                  className="w-full px-3 py-2 border border-gray-700 rounded-md text-white bg-black focus:outline-none focus:border-gray-600"
                />
              </div>
              <div className="space-y-2">
                <div className="text-white text-xs">Role Type</div>
                <div className="relative">
                  <div
                    role="combobox"
                    className="w-full px-3 py-2 border border-gray-700 rounded-md text-white bg-black focus:outline-none focus:border-gray-600 cursor-pointer"
                    onClick={() =>
                      setShowRoleTypeDropdown({
                        ...showRoleTypeDropdown,
                        [index]: !showRoleTypeDropdown[index],
                      })
                    }
                  >
                    <div className="flex justify-between items-center">
                      <span>{role.roleType || "Select Role Type"}</span>
                      <span>▼</span>
                    </div>
                  </div>
                  {showRoleTypeDropdown[index] && (
                    <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg">
                      {roleTypes.map((type) => (
                        <div
                          key={type}
                          className="px-3 py-2 hover:bg-gray-700 cursor-pointer"
                          onClick={() => {
                            const newRoles = [...roles];
                            newRoles[index].roleType = type;
                            setRoles(newRoles);
                            setShowRoleTypeDropdown({
                              ...showRoleTypeDropdown,
                              [index]: false,
                            });
                          }}
                        >
                          {type}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Positions */}
        <div className="space-y-2">
          <div className="text-white text-sm">
            Number of Available Positions
          </div>
          <input
            type="number"
            value={formData.positions}
            onChange={(e) => handleInputChange("positions", e.target.value)}
            placeholder="Enter number"
            className="w-full px-3 py-2 border border-gray-700 rounded-md text-white bg-black focus:outline-none focus:border-gray-600"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <div
            role="button"
            tabIndex="0"
            onClick={addRole}
            className="flex items-center justify-center px-4 py-2 border border-gray-600 rounded-md text-white hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add another role
          </div>
          <div
            role="button"
            tabIndex="0"
            onClick={handleRegister}
            className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-100 transition-colors font-medium cursor-pointer"
          >
            Register Startup
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupRegister;
