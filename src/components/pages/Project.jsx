import { Star, Users, Briefcase, Filter, Plus, BriefcaseBusiness, List } from "lucide-react"
import { Link } from "react-router-dom"
import { allimg } from "../../utils"
import Header from '../sections/Header'

export default function Project() {
  const employees = [
    {
      name: "Lipp Tom",
      username: "lipp",
      avatar: "/placeholder.svg?height=80&width=80&text=LT",
      bio: "Engineer, founder, ceo & Developer that can be found inhabiting coffee houses",
      joined: "6/3/2025",
      href: "/profile/lipp",
      follower:'10',
      project:'4',
      rating:'4'
    },
    {
      name: "Mask ho",
      username: "mask", 
      avatar: "/placeholder.svg?height=80&width=80&text=MH",
      bio: "Engineer, founder, ceo & Developer that can be found inhabiting coffee houses",
      joined: "6/3/2025",
      href: "/profile/mask",
      follower:'10',
      project:'4',
      rating:'4'
    },
    {
      name: "Nom Na",
      username: "nomna",
      avatar: "/placeholder.svg?height=80&width=80&text=NN", 
      bio: "Engineer, founder, ceo & Developer that can be found inhabiting coffee houses",
      joined: "6/3/2025",
      href: "/profile/nomna",
      follower:'10',
      project:'4',
      rating:'4'
    },
    {
      name: "Lipp",
      username: "lipp",
      avatar: "/placeholder.svg?height=80&width=80&text=L",
      bio: "Engineer, founder, ceo & Developer that can be found inhabiting coffee houses", 
      joined: "6/3/2025",
      href: "/profile/lipp",
      follower:'10',
      project:'4',
      rating:'4'
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="mb-6">
        <Header 
         showSearch={true}
         searchPlaceholder="Search ideas..."
         searchContainerClassName="min-w-[50%]"
         searchClassName="w-full"
         onSearch={(value) => {
           console.log('Search:', value);
         }}
         dropdowns={{
           available: {
             label: 'Available',
             buttonText: 'Available',
             options: [
               { label: 'Most Recent', href: '/ideas/recent' },
               { label: 'Most Popular', href: '/ideas/popular' },
               { label: 'Most Commented', href: '/ideas/commented' },
               { label: 'Most Liked', href: '/ideas/liked' }
             ],
             className: 'bg-white/10 text-white hover:bg-white/20',
             show: true,
             buttonSize: 'default'
           },
           userType: {
            label: 'User Type',
            buttonText: 'All Users',
            options: [
              { label: 'Most Recent', href: '/ideas/recent' },
            ],
            className: 'bg-white/10 text-white hover:bg-white/20',
            show: true,
            icon:List,
            buttonSize: 'default'
           },
           position: {
            label: 'Position',
            buttonText: 'All Positions',
            options: [
              { label: 'Most Recent', href: '/ideas/recent' },
            ],
            className: 'bg-white text-black ',
            show: true,
            icon:BriefcaseBusiness,
            buttonSize: 'default'
           }
         }}
         mobileMenuItems={{
           'Filter Options': [
             { label: 'Most Recent', href: '/ideas/recent' },
             { label: 'Most Popular', href: '/ideas/popular' },
             { label: 'Most Commented', href: '/ideas/commented' },
             { label: 'Most Liked', href: '/ideas/liked' }
           ],
           'Actions': [
             { label: 'Add New Idea', href: '/ideas/new' }
           ]
         }}
         mobileMenuButtonText="Ideation Menu"
         searchButtonText="Search Ideas"
         onDropdownOptionClick={(key, option) => {
           console.log(`${key}: ${option.label} selected`);
         }}
         onMobileMenuOptionClick={(title, option) => {
           console.log(`${title}: ${option.label} selected`);
         }}
        />
      </div>
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {employees.map((employee, index) => (
            <div key={index} className="bg-zinc-900 p-3 min-h-[330px]  rounded-xl flex flex-col h-full">
             <div className="bg-[#1A1A1A] min-h-[270px] rounded-4xl p-5">
             <div className="flex justify-between items-start mb-4">
                <div className="h-20 w-20 rounded-full overflow-hidden bg-zinc-700 flex items-center justify-center text-white text-lg font-bold">
                  <img src={allimg.profileImg} alt={employee.name} className="h-full w-full object-cover" />
                </div>
                <Link
                  href={employee.href}
                  className="text-xs text-gray-400 hover:text-white hover:underline transition-colors"
                >
                  View Profile
                </Link>
              </div>

              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium">{employee.name}</h3>
                  <span className="bg-zinc-700 text-white text-[10px] px-1.5 py-0.5 rounded uppercase">Employee</span>
                </div>
                <p className="text-gray-400 text-sm">@{employee.username}</p>
              </div>

              <p className="text-sm text-gray-300 mb-4">{employee.bio}</p>

              <div className="mt-auto">
                <div className="flex gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-400">{employee.follower} followers</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-400">{employee.project} projects</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-400">{employee.rating} rating</span>
                  </div>
                </div>

              </div>
             </div>
              <div className="text-xs text-gray-500 justify-center w-full flex items-center  h-10">Joined: {employee.joined}</div>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
