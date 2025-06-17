// Import required icons and utilities
import { Star, Users, Briefcase, GraduationCap } from "lucide-react"
import { allimg } from "../../utils"
import { useState } from "react"

export default function Profile() {
  const [activeTab, setActiveTab] = useState('work')

  // Work experience data array
  const workExperience = [
    {
      company: "Google",
      period: "2022–2025",
      description: "Worked on scalable systems and product improvements across multiple teams.",
    },
    {
      company: "Amazon",
      period: "2019–2022",
      description: "Led feature development and enhanced system performance for e-commerce platforms.",
    },
    {
      company: "Apple",
      period: "2019–2022",
      description: "Collaborated on UI/UX design systems and implemented responsive frontend solutions.",
    },
    {
      company: "Microsoft",
      period: "2019–2022",
      description: "Developed cloud services and contributed to open-source internal tools.",
    },
  ]

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

  // Freelancing information array
  const freelancingDetails = [
    {
      title: "Hourly Rate",
      value: "$60–90"
    },
    {
      title: "Availability",
      value: "Contract, Part-Time, Full-Time"
    },
    {
      title: "Languages",
      value: "English, Pashto, Hindi, German"
    },
    {
      title: "Roles",
      value: "Frontend, UI Designer, Web Developer"
    },
    {
      title: "Skills",
      value: "JavaScript, Python, React, Next.js, GSAP, Framer Motion, Design, Development"
    }
  ]

  // Profile information array
  const profileInfo = [
    {
      avatar: "LT",
      name: "Lipp Tom",
      role: "EMPLOYEE",
      title: "Repo",
      bio: "Engineer, founder, CEO & developer often found in coffee houses, crafting code and building ideas into reality."
    }
  ]

  const education = [
    {
      school: "Stanford University",
      degree: "Master of Science in Computer Science",
      period: "2017–2019",
      description: "Specialized in Artificial Intelligence and Machine Learning. Graduated with honors."
    },
    {
      school: "MIT",
      degree: "Bachelor of Science in Computer Engineering",
      period: "2013–2017",
      description: "Focused on Software Engineering and Data Structures. Dean's List recipient."
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="mb-6">
        
      </div>
      <div className="w-full space-y-6">
        {/* Main grid layout for profile and freelancing details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile card section */}
          {profileInfo.map((profile, index) => (
            <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
              {/* Profile background image with gradient overlay */}
              <div className="relative h-48 bg-zinc-800">
                <img 
                  src={allimg.profileImg} 
                  alt="Profile background" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900" />
              </div>

              <div className="p-6">
                {/* Profile header with avatar and basic info */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="relative -mt-16">
                    <div className="h-30 w-30 rounded-full bg-orange-600 flex items-center justify-center text-xl font-bold border-4 border-zinc-900">
                      <img src={allimg.profileImg} alt="" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-xl font-semibold">{profile.name}</h2>
                      <span className="bg-zinc-700 text-white text-xs px-2 py-0.5 rounded">{profile.role}</span>
                    </div>
                    <p className="text-orange-500 text-sm">{profile.title}</p>
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
                <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                  {profile.bio}
                </p>

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
          ))}

          {/* Freelancing details section */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6">Freelancing Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {freelancingDetails.map((detail, index) => (
                <div key={index} className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-1">{detail.title}:</h4>
                    <p className="text-white">{detail.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Experience and Education Tabs */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex gap-4 mb-6">
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

          {activeTab === 'work' ? (
            <div className="space-y-4">
              {workExperience.map((job, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3 border-b border-zinc-800 last:border-b-0"
                >
                  <div className="font-medium text-white">{job.company}</div>
                  <div className="text-gray-400 text-sm">{job.period}</div>
                  <div className="text-gray-300 text-sm">{job.description}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3 border-b border-zinc-800 last:border-b-0"
                >
                  <div className="font-medium text-white">{edu.school}</div>
                  <div className="text-gray-400 text-sm">{edu.period}</div>
                  <div className="space-y-1">
                    <div className="text-orange-500 text-sm">{edu.degree}</div>
                    <div className="text-gray-300 text-sm">{edu.description}</div>
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
