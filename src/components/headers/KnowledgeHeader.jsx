import React, { useState } from "react";
import { Search, Plus, X, Filter, Tag } from "lucide-react";
import { IoOptionsOutline } from "react-icons/io5";

const KnowledgeHeader = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedSort,
  setSelectedSort,
}) => {
  const [showNewKnowledgeForm, setShowNewKnowledgeForm] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
  });
  const [errors, setErrors] = useState({});

  const categories = [
    "All Categories",
    "Technology",
    "Business",
    "Marketing",
    "Design",
    "Development",
    "Product",
    "Sales",
    "Finance",
    "HR",
    "Legal",
    "Operations",
  ];

  const sortOptions = ["Newest First", "Oldest First", "A-Z", "Z-A"];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setOpenDropdown(null);
  };

  const handleSortSelect = (sort) => {
    setSelectedSort(sort);
    setOpenDropdown(null);
  };

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: files ? files[0] : value,
    }));
    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.file) {
      newErrors.file = "Please upload a file";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      setFormData({
        title: "",
        description: "",
        file: null,
      });
      setSelectedCategory("All Categories");
      setErrors({});
      setShowNewKnowledgeForm(false);
      alert("Knowledge resource added successfully!");
    } catch (error) {
      alert("Failed to add knowledge resource. Please try again.");
    }
  };

  const NewKnowledgeForm = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1A1A1A] rounded-4xl p-7 w-full max-w-[600px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-medium">Add new Knowledge resource</h2>
          <button
            onClick={() => setShowNewKnowledgeForm(false)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Enter title"
              className={`bg-[#232323] rounded-full p-2 ${
                errors.title ? "border border-red-500" : ""
              }`}
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && (
              <span className="text-red-500 text-sm">{errors.title}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Enter description"
              className={`bg-[#232323] rounded-md p-2 ${
                errors.description ? "border border-red-500" : ""
              }`}
              rows={8}
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <span className="text-red-500 text-sm">{errors.description}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="category">Category</label>
            <div className="relative">
              <div
                className="bg-[#232323] rounded-full p-2 cursor-pointer flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span>{selectedCategory}</span>
              </div>
              {isOpen && (
                <div className="absolute top-full left-0 w-full mt-1 bg-[#232323] rounded-full shadow-lg z-10">
                  {categories
                    .filter((category) => category !== "All Categories")
                    .map((category, index) => (
                      <div
                        key={index}
                        className="p-2 hover:bg-white/10 cursor-pointer"
                        onClick={() => handleCategorySelect(category)}
                      >
                        {category}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="file">Upload file</label>
            <input
              type="file"
              id="file"
              className={`bg-[#232323] rounded-full p-2 ${
                errors.file ? "border border-red-500" : ""
              }`}
              onChange={handleChange}
            />
            {errors.file && (
              <span className="text-red-500 text-sm">{errors.file}</span>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-[#232323] rounded-full p-2"
              onClick={() => {
                setFormData({
                  title: "",
                  description: "",
                  file: null,
                });
                setSelectedCategory("All Categories");
                setErrors({});
                setShowNewKnowledgeForm(false);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-white text-black rounded-full p-2"
            >
              Add Resource
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest(".dropdown-btn")) {
        setOpenDropdown(null);
      }
    };
    if (openDropdown) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [openDropdown]);

  return (
    <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end min-h-[100px] max-sm:min-h-[80px] p-4 gap-4 sm:gap-0">
      <div className="flex items-center justify-between w-full sm:w-auto">
        <h1 className="text-2xl font-semibold">Knowledge Base</h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="sm:hidden p-2 hover:bg-white/10 rounded-lg"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <IoOptionsOutline className="h-6 w-6" />
          )}
        </button>
      </div>

      <div
        className={`${
          isMobileMenuOpen ? "flex" : "hidden"
        } sm:flex flex-col sm:flex-row gap-4 w-full sm:w-auto`}
      >
        <div className="relative w-full sm:w-auto">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search knowledge base..."
              className="w-full sm:w-[300px] px-4 py-2 pl-10 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 text-white placeholder-gray-400"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
        {/* All Categories Dropdown */}
        <div className="relative dropdown-btn">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors w-full sm:w-auto"
            onClick={() =>
              setOpenDropdown(openDropdown === "category" ? null : "category")
            }
            type="button"
          >
            <Tag className="h-4 w-4" />
            <span>{selectedCategory}</span>
          </button>
          {openDropdown === "category" && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-[#1A1A1A] rounded-lg shadow-lg py-2 z-50">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/10"
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Sort Dropdown */}
        <div className="relative dropdown-btn">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors w-full sm:w-auto"
            onClick={() =>
              setOpenDropdown(openDropdown === "sort" ? null : "sort")
            }
            type="button"
          >
            <Filter className="h-4 w-4" />
            <span>{selectedSort}</span>
          </button>
          {openDropdown === "sort" && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-[#1A1A1A] rounded-lg shadow-lg py-2 z-50">
              {sortOptions.map((option, index) => (
                <button
                  key={index}
                  className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/10"
                  onClick={() => handleSortSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={() => setShowNewKnowledgeForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors w-full sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Add Resource</span>
        </button>
      </div>

      {showNewKnowledgeForm && <NewKnowledgeForm />}
    </div>
  );
};

export default KnowledgeHeader;
