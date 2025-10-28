"use client";

import { useState, useRef } from "react";
import { Upload, Plus } from "lucide-react";
import Swal from "sweetalert2"; // Add this import

export default function RegisterStartUp() {
  const [formData, setFormData] = useState({
    startupName: "",
    industry: "",
    location: "",
    description: "",
    stage: "",
    title: "",
    roleType: "",
    positions: "",
  });

  const [roles, setRoles] = useState([{ title: "", roleType: "" }]);
  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);
  const [showRoleTypeDropdown, setShowRoleTypeDropdown] = useState({});
  const logoInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addRole = () => {
    if (roles.length < 100) {
      setRoles([...roles, { title: "", roleType: "" }]);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Maximum Roles Reached",
        text: "You can only add up to 100 roles",
        confirmButtonColor: "#111",
      });
    }
  };

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Retail",
    "Manufacturing",
  ];

  const roleTypes = ["Full Time", "Part Time", "Contract", "Intern"];

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === "logo") setLogoFile(file);
      else setBannerFile(file);
    }
  };

  const validateForm = () => {
    if (!formData.startupName.trim()) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please enter a startup name",
        confirmButtonColor: "#111",
      });
      return false;
    }

    if (!formData.industry) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please select an industry",
        confirmButtonColor: "#111",
      });
      return false;
    }

    if (!formData.location.trim()) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please enter a location",
        confirmButtonColor: "#111",
      });
      return false;
    }

    if (!formData.description.trim()) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please enter a startup description",
        confirmButtonColor: "#111",
      });
      return false;
    }

    if (!formData.stage) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please select a startup stage",
        confirmButtonColor: "#111",
      });
      return false;
    }

    if (!logoFile) {
      Swal.fire({
        icon: "error",
        title: "Missing Logo",
        text: "Please upload a company logo",
        confirmButtonColor: "#111",
      });
      return false;
    }

    // Validate roles
    const invalidRoles = roles.filter(
      (role) => !role.title.trim() || !role.roleType
    );
    if (invalidRoles.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Roles",
        text: "Please fill in all role titles and types",
        confirmButtonColor: "#111",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    try {
      // Show loading state
      Swal.fire({
        title: "Registering Startup...",
        text: "Please wait while we process your request",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const form = new FormData();
      form.append("name", formData.startupName);
      form.append("industry", formData.industry);
      form.append("location", formData.location);
      form.append("description", formData.description);
      form.append("stage", formData.stage);
      form.append("roles", JSON.stringify(roles));
      if (logoFile) form.append("logo", logoFile);
      if (bannerFile) form.append("banner", bannerFile);

      const res = await fetch(
        `https://sfcolab-backend.onrender.com/api/startup/register`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: form,
        }
      );

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Startup Registered Successfully!",
          text:
            data.message || "Your startup has been registered successfully!",
          confirmButtonColor: "#111",
        }).then(() => {
          resetForm();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text:
            data.message ||
            data.error ||
            "Something went wrong. Please try again.",
          confirmButtonColor: "#111",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text:
          error.message ||
          "Unable to connect to server. Please check your connection.",
        confirmButtonColor: "#111",
      });
    }
  };

  // Optional: Function to reset form after successful submission
  const resetForm = () => {
    setFormData({
      startupName: "",
      industry: "",
      location: "",
      description: "",
      stage: "",
      title: "",
      roleType: "",
      positions: "",
    });
    setRoles([{ title: "", roleType: "" }]);
    setLogoFile(null);
    setBannerFile(null);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="p-4">
        <div className="md:text-3xl text-lg font-medium">
          Register New Startup
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative md:h-[400px] h-48 mb-8">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img
          src="https://plus.unsplash.com/premium_photo-1749618351944-e251d669af21?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzN3x8fGVufDB8fHx8fA%3D%3D"
          alt="Mountain landscape"
          className="w-full h-full object-cover rounded-lg "
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-2xl font-semibold text-white text-center">
            Create your start-up in Minutes
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 pb-8 space-y-6">
        {/* Start-up Name */}
        <div className="space-y-2">
          <div className="text-white text-sm">Start-up Name</div>
          <div
            contentEditable
            role="textbox"
            aria-label="Start-up Name"
            className="w-full px-3 py-2 border border-gray-700 rounded-md text-white focus:outline-none focus:border-gray-600"
            onInput={(e) =>
              handleInputChange("startupName", e.currentTarget.textContent)
            }
            suppressContentEditableWarning
          />
        </div>

        {/* Industry and Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-white text-sm">Industry</div>
            <div className="relative">
              <div
                role="combobox"
                className="w-full px-3 py-2 border border-gray-700 rounded-md text-white focus:outline-none focus:border-gray-600 cursor-pointer"
                tabIndex="0"
                onClick={() => setShowIndustryDropdown(!showIndustryDropdown)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setShowIndustryDropdown(!showIndustryDropdown);
                  }
                }}
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
            <div
              contentEditable
              role="textbox"
              aria-label="Location"
              className="w-full px-3 py-2 border border-gray-700 rounded-md text-white focus:outline-none focus:border-gray-600"
              onInput={(e) =>
                handleInputChange("location", e.currentTarget.textContent)
              }
              suppressContentEditableWarning
            />
          </div>
        </div>

        {/* Startup Description */}
        <div className="space-y-2">
          <div className="text-white text-sm">Startup Description</div>
          <div
            contentEditable
            role="textbox"
            aria-label="Description"
            className="w-full px-3 py-2 border border-gray-700 rounded-md text-white focus:outline-none focus:border-gray-600 min-h-[100px]"
            onInput={(e) =>
              handleInputChange("description", e.currentTarget.textContent)
            }
            suppressContentEditableWarning
          />
        </div>

        {/* Startup Stage */}
        <div className="space-y-4">
          <div className="text-white text-sm">Startup Stage</div>
          <div className="grid grid-cols-2 gap-4">
            {["idea", "seed", "early", "growth", "scale"].map((stage) => (
              <div key={stage} className="flex items-center space-x-2">
                <div
                  role="radio"
                  aria-checked={formData.stage === stage}
                  tabIndex="0"
                  className="w-4 h-4 border border-gray-600 rounded-full cursor-pointer"
                  onClick={() => handleInputChange("stage", stage)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleInputChange("stage", stage);
                    }
                  }}
                >
                  {formData.stage === stage && (
                    <div className="w-2 h-2 bg-white rounded-full m-auto mt-1" />
                  )}
                </div>
                <div className="text-white text-sm capitalize">{stage}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Upload Logo and Banner */}
        <div className="space-y-4">
          <div className="text-white text-sm">Upload your logo and banner</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Logo Upload */}
            <div className="space-y-2">
              <div className="text-white text-xs">Logo</div>
              <div
                className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition-colors cursor-pointer"
                onClick={() => logoInputRef.current.click()}
              >
                {logoFile ? (
                  <img
                    src={URL.createObjectURL(logoFile)}
                    alt="Logo Preview"
                    className="w-20 h-20 mx-auto rounded-full object-cover"
                  />
                ) : (
                  <>
                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <div className="text-sm text-gray-400">No file chosen</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Upload your company logo (max 2MB)
                    </div>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={logoInputRef}
                  onChange={(e) => handleFileChange(e, "logo")}
                  className="hidden"
                />
              </div>
            </div>

            {/* Banner Upload */}
            <div className="space-y-2">
              <div className="text-white text-xs">Banner</div>
              <div
                className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition-colors cursor-pointer"
                onClick={() => bannerInputRef.current.click()}
              >
                {bannerFile ? (
                  <img
                    src={URL.createObjectURL(bannerFile)}
                    alt="Banner Preview"
                    className="w-full h-24 object-cover rounded-md"
                  />
                ) : (
                  <>
                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <div className="text-sm text-gray-400">No file chosen</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Upload your company banner (max 5MB)
                    </div>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={bannerInputRef}
                  onChange={(e) => handleFileChange(e, "banner")}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Add Role Section */}
        <div className="space-y-4">
          <div className="text-white text-sm">Add role (up to 100)</div>

          {roles.map((role, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-white text-xs">Title</div>
                <div
                  contentEditable
                  role="textbox"
                  aria-label="Role Title"
                  className="w-full px-3 py-2 border border-gray-700 rounded-md text-white focus:outline-none focus:border-gray-600"
                  onInput={(e) => {
                    const newRoles = [...roles];
                    newRoles[index].title = e.currentTarget.textContent;
                    setRoles(newRoles);
                  }}
                  suppressContentEditableWarning
                />
              </div>
              <div className="space-y-2">
                <div className="text-white text-xs">Role Type</div>
                <div className="relative">
                  <div
                    role="combobox"
                    className="w-full px-3 py-2 border border-gray-700 rounded-md text-white focus:outline-none focus:border-gray-600 cursor-pointer"
                    tabIndex="0"
                    onClick={() =>
                      setShowRoleTypeDropdown({
                        ...showRoleTypeDropdown,
                        [index]: !showRoleTypeDropdown[index],
                      })
                    }
                    onKeyPress={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setShowRoleTypeDropdown({
                          ...showRoleTypeDropdown,
                          [index]: !showRoleTypeDropdown[index],
                        });
                      }
                    }}
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

        {/* Number of Available Positions */}
        <div className="space-y-2">
          <div className="text-white text-sm">
            Number of Available Positions
          </div>
          <div
            contentEditable
            role="spinbutton"
            aria-label="Number of Positions"
            className="w-full px-3 py-2 border border-gray-700 rounded-md text-white focus:outline-none focus:border-gray-600"
            onInput={(e) => {
              const value = e.currentTarget.textContent;
              if (/^\d*$/.test(value)) {
                handleInputChange("positions", value);
              }
            }}
            suppressContentEditableWarning
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <div
            role="button"
            tabIndex="0"
            onClick={addRole}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                addRole();
              }
            }}
            className="flex items-center justify-center px-4 py-2 border border-gray-600 rounded-md text-white hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add another role
          </div>
          <div
            role="button"
            tabIndex="0"
            onClick={handleSubmit}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleSubmit();
              }
            }}
            className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-100 transition-colors font-medium cursor-pointer text-center"
          >
            Register Startup
          </div>
        </div>
      </div>
    </div>
  );
}
