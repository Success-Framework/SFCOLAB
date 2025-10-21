// Import required icons and utilities
import { Star, Users, Briefcase, GraduationCap, Edit, Save, Plus, Trash2, X, Camera } from "lucide-react"
import { allimg } from "../../utils"
import { useState, useRef } from "react"

const EditModal = ({ item, type, onSave, onClose }) => {
  const [formData, setFormData] = useState(
    item || (type === 'work'
      ? { company: '', period: '', description: '' }
      : { school: '', degree: '', period: '', description: '' })
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const fields = type === 'work'
    ? [
        { name: 'company', label: 'Company', type: 'text' },
        { name: 'period', label: 'Period (e.g., 2022–2025)', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' },
      ]
    : [
        { name: 'school', label: 'School/University', type: 'text' },
        { name: 'degree', label: 'Degree', type: 'text' },
        { name: 'period', label: 'Period (e.g., 2017–2019)', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' },
      ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-white hover:bg-zinc-700 rounded-full">
          <X size={18} />
        </button>
        <h3 className="text-lg font-semibold mb-4 capitalize">{item ? 'Edit' : 'Add'} {type}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(field => (
            <div key={field.name}>
              <label className="text-sm font-medium text-gray-400 mb-1 block">{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  rows="3"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              ) : (
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              )}
            </div>
          ))}
          <div className="flex justify-end pt-4">
            <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold">
              <Save size={16} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Profile() {
  const [activeTab, setActiveTab] = useState('work')

  // State for profile data, edit mode, and bio text
  const [profileData, setProfileData] = useState({
    avatar: allimg.profileImg,
    cover: allimg.profileImg,
    name: "Lipp Tom",
    role: "EMPLOYEE",
    title: "Repo",
    bio: "Engineer, founder, CEO & developer often found in coffee houses, crafting code and building ideas into reality.",
    freelance: {
      hourlyRate: "$60–90",
      availability: "Contract, Part-Time, Full-Time",
      languages: "English, Pashto, Hindi, German",
      roles: "Frontend, UI Designer, Web Developer",
      skills: "JavaScript, Python, React, Next.js, GSAP, Framer Motion, Design, Development",
    },
    workExperience: [
      { id: 1, company: "Google", period: "2022–2025", description: "Worked on scalable systems and product improvements across multiple teams." },
      { id: 2, company: "Amazon", period: "2019–2022", description: "Led feature development and enhanced system performance for e-commerce platforms." },
      { id: 3, company: "Apple", period: "2019–2022", description: "Collaborated on UI/UX design systems and implemented responsive frontend solutions." },
      { id: 4, company: "Microsoft", period: "2019–2022", description: "Developed cloud services and contributed to open-source internal tools." },
    ],
    education: [
      { id: 1, school: "Stanford University", degree: "Master of Science in Computer Science", period: "2017–2019", description: "Specialized in Artificial Intelligence and Machine Learning. Graduated with honors." },
      { id: 2, school: "MIT", degree: "Bachelor of Science in Computer Engineering", period: "2013–2017", description: "Focused on Software Engineering and Data Structures. Dean's List recipient." },
    ]
  });
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingFreelance, setIsEditingFreelance] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, type: null, item: null });

  const coverImageRef = useRef(null);
  const profileImageRef = useRef(null);

  // Social media links array
  const socialLinks = [
    { name: "Public Links", url: "#" },
    { name: "LinkedIn", url: "#" },
    { name: "Twitter", url: "#" },
    { name: "Instagram", url: "#" },
    { name: "Website", url: "#" },
  ]

  // User statistics array with icons
  const stats = [
    { icon: Users, text: "10 followers" },
    { icon: Briefcase, text: "10 projects" },
    { icon: Star, text: "2.9 rating" }
  ]

  const handleSaveBio = () => {
    // In a real application, you would make an API call here to save the updated bio.
    // For example: `await usersAPI.updateUser(userId, { profile: { bio: profileData.bio } });`
    // See backend/src/routes/users.js for the endpoint.
    setIsEditingBio(false);
  };
  const handleBioChange = (e) => {
    setProfileData(prev => ({ ...prev, bio: e.target.value }));
  };

  const handleFreelanceChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      freelance: {
        ...prev.freelance,
        [name]: value
      }
    }));
  };

  const handleSaveFreelance = () => {
    setIsEditingFreelance(false);
  }

  const handleImageChange = (e, imageType) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({ ...prev, [imageType]: reader.result }));
        // Here you would call an API to upload the file.
        // e.g., `filesAPI.uploadFile(file, 'user_avatar', { type: 'user', id: userId })`
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveItem = (item) => {
    const { type } = modalState;
    const listKey = type === 'work' ? 'workExperience' : 'education';

    if (item.id) { // Update existing item
      setProfileData(prev => ({
        ...prev,
        [listKey]: prev[listKey].map(i => i.id === item.id ? item : i)
      }));
    } else { // Add new item
      const newItem = { ...item, id: Date.now() }; // Use a better ID in a real app
      setProfileData(prev => ({
        ...prev,
        [listKey]: [...prev[listKey], newItem]
      }));
    }
    setModalState({ isOpen: false, type: null, item: null });
  };

  const handleDeleteItem = (id, type) => {
    if (window.confirm(`Are you sure you want to delete this ${type} entry?`)) {
      const listKey = type === 'work' ? 'workExperience' : 'education';
      setProfileData(prev => ({
        ...prev,
        [listKey]: prev[listKey].filter(i => i.id !== id)
      }));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {modalState.isOpen && (
        <EditModal
          item={modalState.item}
          type={modalState.type}
          onSave={handleSaveItem}
          onClose={() => setModalState({ isOpen: false, type: null, item: null })}
        />
      )}
      <div className="mb-6">
        
      </div>
      <div className="w-full space-y-6">
        {/* Main grid layout for profile and freelancing details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile card section */}          
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
              {/* Cover image */}
              <div className="group relative h-48 bg-zinc-800">
                <input type="file" ref={coverImageRef} onChange={(e) => handleImageChange(e, 'cover')} className="hidden" accept="image/*" />
                <img 
                  src={profileData.cover} 
                  alt="Profile background" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900" />
                <button 
                  onClick={() => coverImageRef.current.click()}
                  className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-black/50 text-white rounded-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                >
                  <Camera size={14} /> Edit Cover
                </button>
              </div>

              <div className="p-6">
                {/* Profile header with avatar and basic info */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="group relative -mt-16">
                    <input type="file" ref={profileImageRef} onChange={(e) => handleImageChange(e, 'avatar')} className="hidden" accept="image/*" />
                    <div className="h-24 w-24 rounded-full bg-orange-600 flex items-center justify-center text-xl font-bold border-4 border-zinc-900 overflow-hidden">
                      <img src={profileData.avatar} alt="Profile Avatar" className="w-full h-full object-cover" />
                    </div>
                    <button 
                      onClick={() => profileImageRef.current.click()}
                      className="absolute inset-0 flex items-center justify-center bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Camera size={24} />
                    </button>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-xl font-semibold">{profileData.name}</h2>
                      <span className="bg-zinc-700 text-white text-xs px-2 py-0.5 rounded">{profileData.role}</span>
                    </div>
                    <p className="text-orange-500 text-sm">{profileData.title}</p>
                  </div>
                </div>

                {/* User statistics section */}
                <div className="flex gap-6 mb-4 text-sm text-gray-300">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <stat.icon className="h-4 w-4 text-gray-400" />
                      <span>{stat.text}</span>
                    </div>
                  ))}
                </div>

                {/* User bio section */}
                <div className="mb-6">
                  {isEditingBio ? (
                    <div>
                      <h4 className="text-md font-semibold mb-2">Edit Bio</h4>
                      <textarea
                        value={profileData.bio}
                        onChange={handleBioChange}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-sm text-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        rows="4"
                      />
                      <button onClick={handleSaveBio} className="mt-2 flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold">
                        <Save size={14} /> Save Bio
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-md font-semibold">Bio</h4>
                        <button onClick={() => setIsEditingBio(true)} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white px-2 py-1 rounded-lg hover:bg-zinc-700 transition-colors">
                          <Edit size={14} /> Edit
                        </button>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {profileData.bio}
                      </p>
                    </div>
                  )}
                </div>
                {/* Social links section */}
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((link, index) => (
                    <a key={index} href={link.url} className="text-xs text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

          {/* Freelancing details section */}
          <div className="relative bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Freelancing Details</h3>
              {isEditingFreelance ? (
                <button onClick={handleSaveFreelance} className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">
                  <Save size={14} /> Save
                </button>
              ) : (
                <button onClick={() => setIsEditingFreelance(true)} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white px-2 py-1 rounded-lg hover:bg-zinc-700 transition-colors">
                  <Edit size={14} /> Edit
                </button>
              )}
            </div>

            {isEditingFreelance ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(profileData.freelance).map(([key, value]) => (
                  <div key={key}>
                    <label className="text-sm font-medium text-gray-400 mb-1 block capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                    <input
                      type="text"
                      name={key}
                      value={value}
                      onChange={handleFreelanceChange}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(profileData.freelance).map(([key, value]) => (
                  <div key={key}>
                    <h4 className="text-sm font-medium text-gray-300 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</h4>
                    <p className="text-white text-sm">{value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Experience and Education Tabs */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('work')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'work' 
                    ? 'bg-zinc-800 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Briefcase className="h-4 w-4" />
                Work Experience
              </button>
              <button
                onClick={() => setActiveTab('education')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'education' 
                    ? 'bg-zinc-800 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <GraduationCap className="h-4 w-4" />
                Education
              </button>
            </div>
            <button onClick={() => setModalState({ isOpen: true, type: activeTab, item: null })} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white px-2 py-1 rounded-lg hover:bg-zinc-700 transition-colors">
              <Plus size={14} /> Add New
            </button>
          </div>

          {activeTab === 'work' ? (
            <div className="space-y-4">
              {profileData.workExperience.map((job) => (
                <div key={job.id} className="group grid grid-cols-1 md:grid-cols-3 gap-4 py-3 border-b border-zinc-800 last:border-b-0">
                  <div className="font-medium text-white">{job.company}</div>
                  <div className="text-gray-400 text-sm">{job.period}</div>
                  <div className="text-gray-300 text-sm flex justify-between items-start">
                    <span>{job.description}</span>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setModalState({ isOpen: true, type: 'work', item: job })} className="p-1 text-gray-400 hover:text-blue-400"><Edit size={14} /></button>
                      <button onClick={() => handleDeleteItem(job.id, 'work')} className="p-1 text-gray-400 hover:text-red-400"><Trash2 size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {profileData.education.map((edu) => (
                <div key={edu.id} className="group grid grid-cols-1 md:grid-cols-3 gap-4 py-3 border-b border-zinc-800 last:border-b-0">
                  <div className="font-medium text-white">{edu.school}</div>
                  <div className="text-gray-400 text-sm">{edu.period}</div>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="text-orange-500 text-sm">{edu.degree}</div>
                      <div className="text-gray-300 text-sm">{edu.description}</div>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setModalState({ isOpen: true, type: 'education', item: edu })} className="p-1 text-gray-400 hover:text-blue-400"><Edit size={14} /></button>
                      <button onClick={() => handleDeleteItem(edu.id, 'education')} className="p-1 text-gray-400 hover:text-red-400"><Trash2 size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
