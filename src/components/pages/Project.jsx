import { Star, Users, Briefcase, Filter, Plus, BriefcaseBusiness, List, ArrowUpRight, Calendar, Award, Code2 } from "lucide-react"
import { Link } from "react-router-dom"
import { allimg } from "../../utils"
import FindContributionHeader from "../headers/FindContributionHeader"

export default function Project() {
  const employees = [
    {
      id: 1,
      name: "Lipp Tom",
      username: "lipp",
      avatar: allimg.profileImg,
      bio: "Engineer, founder, ceo & Developer that can be found inhabiting coffee houses",
      joined: "March 6, 2024",
      role: "Employee",
      follower: '10',
      project: '4',
      rating: '4.8',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'GraphQL'],
      experience: [
        {
          title: 'Senior Developer',
          company: 'Tech Corp',
          duration: '2020 - Present',
          description: 'Leading development of enterprise applications'
        }
      ],
      metrics: {
        contributions: '1.2k',
        commits: '856',
        reviews: '234'
      }
    },
    {
      id: 2,
      name: "Mask ho",
      username: "mask", 
      avatar: allimg.profileImg,
      bio: "Engineer, founder, ceo & Developer that can be found inhabiting coffee houses",
      joined: "March 6, 2024",
      role: "Employee",
      follower: '10',
      project: '4',
      rating: '4.5',
      skills: ['Python', 'Django', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS'],
      experience: [
        {
          title: 'Backend Developer',
          company: 'Data Systems',
          duration: '2019 - Present',
          description: 'Building scalable backend services'
        }
      ],
      metrics: {
        contributions: '980',
        commits: '654',
        reviews: '189'
      }
    },
    {
      id: 3,
      name: "Nom Na",
      username: "nomna",
      avatar: allimg.profileImg, 
      bio: "Engineer, founder, ceo & Developer that can be found inhabiting coffee houses",
      joined: "March 6, 2024",
      role: "Employee",
      follower: '10',
      project: '4',
      rating: '4.9',
      skills: ['Vue.js', 'Firebase', 'Tailwind', 'GraphQL', 'TypeScript', 'Jest'],
      experience: [
        {
          title: 'Frontend Developer',
          company: 'Web Solutions',
          duration: '2021 - Present',
          description: 'Creating modern web applications'
        }
      ],
      metrics: {
        contributions: '1.5k',
        commits: '1.2k',
        reviews: '345'
      }
    },
    {
      id: 4,
      name: "Lipp",
      username: "lipp",
      avatar: allimg.profileImg,
      bio: "Engineer, founder, ceo & Developer that can be found inhabiting coffee houses", 
      joined: "March 6, 2024",
      role: "Employee",
      follower: '10',
      project: '4',
      rating: '4.7',
      skills: ['Java', 'Spring Boot', 'MySQL', 'Kubernetes', 'Docker', 'AWS'],
      experience: [
        {
          title: 'Full Stack Developer',
          company: 'Enterprise Solutions',
          duration: '2018 - Present',
          description: 'Full stack development and architecture'
        }
      ],
      metrics: {
        contributions: '1.1k',
        commits: '789',
        reviews: '267'
      }
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="mb-6">
        <FindContributionHeader/>
      </div>
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {employees.map((employee) => (
            <Link 
              key={employee.id}
              to={`/project-details?id=${employee.id}`}
              className="bg-zinc-900 p-3 min-h-[330px] rounded-xl flex flex-col h-full hover:bg-zinc-800 transition-colors"
            >
              <div className="bg-[#1A1A1A] min-h-[270px] rounded-4xl p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="h-20 w-20 rounded-full overflow-hidden bg-zinc-700 flex items-center justify-center text-white text-lg font-bold">
                    <img src={employee.avatar} alt={employee.name} className="h-full w-full object-cover" />
                  </div>
                  <Link 
                    to={`/profile?username=${employee.username}`}
                    className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                  >
                    View Profile
                    <ArrowUpRight size={12} />
                  </Link>
                </div>

                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{employee.name}</h3>
                    <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full uppercase">
                      {employee.role}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">@{employee.username}</p>
                </div>

                <p className="text-sm text-gray-300 mb-4 line-clamp-2">{employee.bio}</p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {Object.entries(employee.metrics).map(([key, value], index) => (
                    <div key={index} className="bg-zinc-800 rounded-lg p-2 text-center">
                      <p className="text-xs text-gray-400 mb-1">{key}</p>
                      <p className="text-sm font-medium">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {employee.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="bg-zinc-800 text-xs px-2 py-0.5 rounded-full">
                      {skill}
                    </span>
                  ))}
                  {employee.skills.length > 3 && (
                    <span className="bg-zinc-800 text-xs px-2 py-0.5 rounded-full">
                      +{employee.skills.length - 3}
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="mt-auto">
                  <div className="flex gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-blue-500" />
                      <span className="text-xs text-gray-400">{employee.follower} followers</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-gray-400">{employee.project} projects</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs text-gray-400">{employee.rating} rating</span>
                    </div>
                  </div>
                </div>

                {/* Experience Preview */}
                <div className="border-t border-white/10 pt-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Code2 className="h-4 w-4 text-purple-500" />
                    <span className="text-gray-400">{employee.experience[0].title}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <Calendar className="h-3 w-3" />
                    <span>{employee.experience[0].duration}</span>
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 justify-center w-full flex items-center h-10">
                <Calendar className="h-3 w-3 mr-1" />
                Joined: {employee.joined}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
