import React, { useState } from "react";
import { MessageCircle, Heart, Share2, Video, Image as ImageIcon, Link as LinkIcon, ChartNoAxesColumn, Pin, Users, Award, Hash, PhoneCall, Plus, X, BarChart3, Search, Settings, Crown, Shield, Circle, Hash as HashIcon, Volume2, Mic, Headphones, Gamepad2, Coffee, Rocket, Lightbulb, Code, Palette, TrendingUp, Users2, Calendar, Trophy, Zap, Menu } from "lucide-react";

const mockChannels = {
  "📢 Announcements": [
    { name: "#general", unread: 0, pinned: 1 },
    { name: "#rules", unread: 0, pinned: 0 },
    { name: "#welcome", unread: 0, pinned: 0 }
  ],
  "🚀 Startups": [
    { name: "#startup-showcase", unread: 3, pinned: 2 },
    { name: "#funding-talk", unread: 1, pinned: 0 },
    { name: "#pitch-deck", unread: 0, pinned: 1 }
  ],
  "💡 Ideation": [
    { name: "#brainstorming", unread: 5, pinned: 0 },
    { name: "#ideathon", unread: 2, pinned: 1 },
    { name: "#hackathon", unread: 4, pinned: 0 }
  ],
  "🛠️ AI Tools": [
    { name: "#ai-tools", unread: 0, pinned: 3 },
    { name: "#prompts", unread: 1, pinned: 0 },
    { name: "#automation", unread: 0, pinned: 0 }
  ],
  "🎯 Projects": [
    { name: "#freelance", unread: 2, pinned: 0 },
    { name: "#collaboration", unread: 1, pinned: 0 },
    { name: "#mentorship", unread: 0, pinned: 1 }
  ],
  "🎉 Community": [
    { name: "#memes", unread: 8, pinned: 0 },
    { name: "#events", unread: 1, pinned: 2 },
    { name: "#off-topic", unread: 3, pinned: 0 }
  ]
};

const mockMembers = [
  { name: "Jane Doe", role: "Admin", status: "online", avatar: "/src/assets/img/profile photo.svg" },
  { name: "Mike Chen", role: "Moderator", status: "idle", avatar: "/src/assets/img/profile photo.svg" },
  { name: "Sarah Lee", role: "Member", status: "online", avatar: "/src/assets/img/profile photo.svg" },
  { name: "Alex Kim", role: "Member", status: "dnd", avatar: "/src/assets/img/profile photo.svg" },
  { name: "Tom Wilson", role: "Member", status: "offline", avatar: "/src/assets/img/profile photo.svg" }
];

const mockPinned = [
  { id: 1, type: "announcement", content: "🚀 Welcome to the SFCollab Community! Check out the new AI Tools tab.", author: "Admin", date: "2024-06-01" },
  { id: 2, type: "winner", content: "🏆 Congrats to @jane for winning the May Ideathon!", author: "Admin", date: "2024-06-02" },
  { id: 3, type: "tool", content: "🛠️ Try our new Project Timeline Generator in #ai-tools!", author: "Admin", date: "2024-06-03" },
];

const mockFeed = [
  { id: 101, type: "post", author: { name: "Jane Doe", avatar: "/src/assets/img/profile photo.svg", role: "@designer" }, date: "2h ago", content: "Check out this cool meme! #memes", image: "https://i.imgur.com/YO4FQbS.jpg", likes: 12, comments: 3, shares: 1, pinned: false },
  { id: 102, type: "poll", author: { name: "Mike Chen", avatar: "/src/assets/img/profile photo.svg", role: "@dev" }, date: "3h ago", content: "Which AI tool do you use most? #ai-tools", poll: { options: ["ChatGPT", "Midjourney", "Copilot", "Other"], votes: [10, 5, 3, 2], voted: null }, likes: 5, comments: 2, shares: 0, pinned: false },
  { id: 103, type: "post", author: { name: "Sarah Lee", avatar: "/src/assets/img/profile photo.svg", role: "@founder" }, date: "5h ago", content: "Launching our new startup soon! #startups", link: "https://sfstartups.com", likes: 8, comments: 1, shares: 2, pinned: false },
  { id: 104, type: "tool", author: { name: "AI Bot", avatar: "/src/assets/img/profile photo.svg", role: "@ai" }, date: "1d ago", content: "Try the new #timeline-generator tool for your projects!", likes: 3, comments: 0, shares: 0, pinned: false },
];

const filters = ["All", "Startups I Follow", "Events", "Memes", "AI Tools"];

export default function Community() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showPostBox, setShowPostBox] = useState(false);
  const [postType, setPostType] = useState("text");
  const [postContent, setPostContent] = useState("");
  const [postMedia, setPostMedia] = useState(null);
  const [postLink, setPostLink] = useState("");
  const [postPoll, setPostPoll] = useState(["", ""]);
  const [feed, setFeed] = useState(mockFeed);
  const [commentBox, setCommentBox] = useState({});
  const [comments, setComments] = useState({});
  const [pollVotes, setPollVotes] = useState({});
  const [selectedChannel, setSelectedChannel] = useState("#general");
  const [showSidebar, setShowSidebar] = useState(false);
  const [showMembers, setShowMembers] = useState(false);

  // Filter feed
  const filteredFeed = feed.filter(post => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Memes") return post.content?.toLowerCase().includes("meme");
    if (activeFilter === "AI Tools") return post.content?.toLowerCase().includes("tool");
    if (activeFilter === "Events") return post.content?.toLowerCase().includes("event") || post.type === "poll";
    if (activeFilter === "Startups I Follow") return post.content?.toLowerCase().includes("startup");
    return true;
  });

  // Post submit
  const handlePost = () => {
    let newPost = {
      id: Date.now(),
      type: postType,
      author: { name: "You", avatar: "/src/assets/img/profile photo.svg", role: "@you" },
      date: "now",
      content: postContent,
      likes: 0, comments: 0, shares: 0, pinned: false,
    };
    if (postType === "image" && postMedia) newPost.image = postMedia;
    if (postType === "video" && postMedia) newPost.video = postMedia;
    if (postType === "link" && postLink) newPost.link = postLink;
    if (postType === "poll") newPost.poll = { options: postPoll, votes: postPoll.map(() => 0), voted: null };
    setFeed([newPost, ...feed]);
    setShowPostBox(false);
    setPostContent(""); setPostMedia(null); setPostLink(""); setPostPoll(["", ""]);
  };

  // Like, Share, Comment, Call
  const handleLike = id => setFeed(feed.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  const handleShare = id => setFeed(feed.map(p => p.id === id ? { ...p, shares: p.shares + 1 } : p));
  const handleStartCall = id => alert("Starting call with post author (mock)");
  const handleAddComment = (id, text) => {
    setComments({ ...comments, [id]: [...(comments[id] || []), { user: "You", text }] });
    setCommentBox({ ...commentBox, [post.id]: "" });
  };
  
  // Poll vote
  const handleVote = (id, idx) => {
    setFeed(feed.map(p => p.id === id ? { ...p, poll: { ...p.poll, votes: p.poll.votes.map((v, i) => i === idx ? v + 1 : v), voted: idx } } : p));
    setPollVotes({ ...pollVotes, [id]: idx });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "idle": return "bg-yellow-500";
      case "dnd": return "bg-red-500";
      case "offline": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "Admin": return <Crown className="h-3 w-3 text-yellow-400" />;
      case "Moderator": return <Shield className="h-3 w-3 text-blue-400" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#313338] text-white flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="lg:hidden bg-[#2B2D31] border-b border-[#40444B] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-2 text-gray-400 hover:text-white hover:bg-[#40444B] rounded-md"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Rocket className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-white">SFCollab</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowMembers(!showMembers)}
            className="p-2 text-gray-400 hover:text-white hover:bg-[#40444B] rounded-md"
          >
            <Users className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Discord-style Sidebar - Responsive */}
      <div className={`
        ${showSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
        fixed lg:relative inset-y-0 left-0 z-40 lg:z-auto
        w-64 lg:w-64 bg-[#2B2D31] transition-transform duration-300 ease-in-out
        lg:flex-shrink-0 flex flex-col
      `}>
        {/* Server Header */}
        <div className="h-12 bg-[#23272A] flex items-center justify-between px-4 border-b border-[#40444B]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Rocket className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-white">SFCollab</span>
          </div>
          <button 
            onClick={() => setShowSidebar(false)} 
            className="lg:hidden p-1 text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Channels */}
        <div className="flex-1 overflow-y-auto">
          {Object.entries(mockChannels).map(([category, channels]) => (
            <div key={category} className="mt-4">
              <div className="px-4 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {category}
              </div>
              {channels.map((channel) => (
                <button
                  key={channel.name}
                  onClick={() => {
                    setSelectedChannel(channel.name);
                    setShowSidebar(false); // Close sidebar on mobile after selection
                  }}
                  className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#40444B] transition-colors ${
                    selectedChannel === channel.name ? 'bg-[#40444B] text-white' : 'text-gray-300'
                  }`}
                >
                  <HashIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <span className="flex-1 text-left truncate">{channel.name}</span>
                  {channel.unread > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full flex-shrink-0">
                      {channel.unread}
                    </span>
                  )}
                  {channel.pinned > 0 && <Pin className="h-3 w-3 text-gray-400 flex-shrink-0" />}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* User Info */}
        <div className="h-16 bg-[#23272A] border-t border-[#40444B] flex items-center px-4">
          <div className="flex items-center gap-3 w-full">
            <div className="relative flex-shrink-0">
              <img src="/src/assets/img/profile photo.svg" alt="You" className="h-8 w-8 rounded-full" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#23272A]"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">You</div>
              <div className="text-xs text-gray-400 truncate">@you</div>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button className="p-1 text-gray-400 hover:text-white rounded">
                <Mic className="h-4 w-4" />
              </button>
              <button className="p-1 text-gray-400 hover:text-white rounded">
                <Headphones className="h-4 w-4" />
              </button>
              <button className="p-1 text-gray-400 hover:text-white rounded">
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${showSidebar ? 'lg:ml-0' : 'lg:ml-0'}`}>
        {/* Channel Header */}
        <div className="h-12 bg-[#313338] border-b border-[#40444B] flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-2 lg:gap-3 min-w-0">
            <HashIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
            <span className="font-bold text-white truncate">{selectedChannel}</span>
            <span className="text-sm text-gray-400 hidden sm:inline">• Community</span>
          </div>
          <div className="flex items-center gap-1 lg:gap-2">
            <button className="p-2 text-gray-400 hover:text-white hover:bg-[#40444B] rounded">
              <Search className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-[#40444B] rounded">
              <Pin className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-[#40444B] rounded">
              <Users className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex">
          {/* Main Feed */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 min-w-0">
            <div className="max-w-4xl mx-auto">
              {/* Pinned Messages */}
              {mockPinned.length > 0 && (
                <div className="mb-4 lg:mb-6">
                  <div className="flex items-center gap-2 mb-2 lg:mb-3">
                    <Pin className="h-4 w-4 text-blue-400 flex-shrink-0" />
                    <span className="text-sm font-semibold text-blue-400">Pinned Messages</span>
                  </div>
                  <div className="space-y-2">
                    {mockPinned.map(pin => (
                      <div key={pin.id} className="bg-[#2B2D31] border-l-4 border-blue-600 rounded-lg px-3 py-2 lg:px-4 lg:py-3 text-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                          <span className="font-bold text-white text-xs sm:text-sm">
                            {pin.type === "announcement" ? "📢 Announcement" : pin.type === "winner" ? "🏆 Winner" : "🛠️ Tool"}
                          </span>
                          <span className="text-gray-400 text-xs sm:text-sm">• {pin.author}</span>
                          <span className="text-gray-500 text-xs sm:text-sm">• {pin.date}</span>
                        </div>
                        <span className="text-gray-200 text-xs sm:text-sm">{pin.content}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Post Box */}
              <div className="bg-[#2B2D31] rounded-lg p-3 lg:p-4 mb-4 lg:mb-6 border border-[#40444B]">
                <div className="flex gap-1 lg:gap-2 mb-3 overflow-x-auto pb-2">
                  <button className={`px-2 lg:px-3 py-1 lg:py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap flex-shrink-0 ${postType === "text" ? "bg-blue-600 text-white" : "bg-[#40444B] text-gray-300 hover:bg-[#4F545C]"}`} onClick={() => setPostType("text")}>Text</button>
                  <button className={`px-2 lg:px-3 py-1 lg:py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap flex-shrink-0 ${postType === "image" ? "bg-blue-600 text-white" : "bg-[#40444B] text-gray-300 hover:bg-[#4F545C]"}`} onClick={() => setPostType("image")}>Image</button>
                  <button className={`px-2 lg:px-3 py-1 lg:py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap flex-shrink-0 ${postType === "video" ? "bg-blue-600 text-white" : "bg-[#40444B] text-gray-300 hover:bg-[#4F545C]"}`} onClick={() => setPostType("video")}>Video</button>
                  <button className={`px-2 lg:px-3 py-1 lg:py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap flex-shrink-0 ${postType === "link" ? "bg-blue-600 text-white" : "bg-[#40444B] text-gray-300 hover:bg-[#4F545C]"}`} onClick={() => setPostType("link")}>Link</button>
                  <button className={`px-2 lg:px-3 py-1 lg:py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap flex-shrink-0 ${postType === "poll" ? "bg-blue-600 text-white" : "bg-[#40444B] text-gray-300 hover:bg-[#4F545C]"}`} onClick={() => setPostType("poll")}>Poll</button>
                </div>
                
                {postType === "text" && (
                  <textarea 
                    className="w-full bg-[#40444B] rounded-md px-3 py-2 text-white placeholder-gray-400 mb-3 border-none focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none text-sm" 
                    placeholder={`Message #${selectedChannel}...`} 
                    value={postContent} 
                    onChange={e => setPostContent(e.target.value)} 
                    rows={3}
                  />
                )}
                
                {postType === "image" && (
                  <div className="space-y-3">
                    <input type="file" accept="image/*" onChange={e => setPostMedia(URL.createObjectURL(e.target.files[0]))} className="text-sm text-gray-300" />
                    {postMedia && <img src={postMedia} alt="preview" className="max-h-40 rounded-md w-full object-cover" />}
                    <textarea 
                      className="w-full bg-[#40444B] rounded-md px-3 py-2 text-white placeholder-gray-400 border-none focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none text-sm" 
                      placeholder="Add a caption..." 
                      value={postContent} 
                      onChange={e => setPostContent(e.target.value)} 
                      rows={2}
                    />
                  </div>
                )}
                
                {postType === "video" && (
                  <div className="space-y-3">
                    <input type="file" accept="video/*" onChange={e => setPostMedia(URL.createObjectURL(e.target.files[0]))} className="text-sm text-gray-300" />
                    {postMedia && <video src={postMedia} controls className="max-h-40 rounded-md w-full" />}
                    <textarea 
                      className="w-full bg-[#40444B] rounded-md px-3 py-2 text-white placeholder-gray-400 border-none focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none text-sm" 
                      placeholder="Add a description..." 
                      value={postContent} 
                      onChange={e => setPostContent(e.target.value)} 
                      rows={2}
                    />
                  </div>
                )}
                
                {postType === "link" && (
                  <div className="space-y-3">
                    <input 
                      className="w-full bg-[#40444B] rounded-md px-3 py-2 text-white placeholder-gray-400 border-none focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm" 
                      placeholder="Paste a link..." 
                      value={postLink} 
                      onChange={e => setPostLink(e.target.value)} 
                    />
                    <textarea 
                      className="w-full bg-[#40444B] rounded-md px-3 py-2 text-white placeholder-gray-400 border-none focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none text-sm" 
                      placeholder="Add a description..." 
                      value={postContent} 
                      onChange={e => setPostContent(e.target.value)} 
                      rows={2}
                    />
                  </div>
                )}
                
                {postType === "poll" && (
                  <div className="space-y-3">
                    <textarea 
                      className="w-full bg-[#40444B] rounded-md px-3 py-2 text-white placeholder-gray-400 border-none focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none text-sm" 
                      placeholder="Ask a question..." 
                      value={postContent} 
                      onChange={e => setPostContent(e.target.value)} 
                      rows={2}
                    />
                    <div className="space-y-2">
                      {postPoll.map((opt, i) => (
                        <input 
                          key={i} 
                          className="w-full bg-[#40444B] rounded-md px-3 py-2 text-white placeholder-gray-400 border-none focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm" 
                          placeholder={`Option ${i + 1}`} 
                          value={opt} 
                          onChange={e => setPostPoll(postPoll.map((o, idx) => idx === i ? e.target.value : o))} 
                        />
                      ))}
                      <button className="text-xs text-blue-400 hover:text-blue-300 self-start flex items-center gap-1" onClick={() => setPostPoll([...postPoll, ""])}>
                        <Plus size={14} /> Add Option
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="text-xs text-gray-400 order-2 sm:order-1">
                    Press Enter to send, Shift+Enter for new line
                  </div>
                  <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2 w-full sm:w-auto" 
                    onClick={handlePost}
                    disabled={!postContent.trim()}
                  >
                    Post
                  </button>
                </div>
              </div>

              {/* Feed */}
              <div className="space-y-4">
                {filteredFeed.map(post => (
                  <div key={post.id} className="bg-[#2B2D31] rounded-lg p-3 lg:p-4 border border-[#40444B] hover:border-[#4F545C] transition-colors">
                    {/* Author & Meta */}
                    <div className="flex items-start gap-3 mb-3">
                      <img src={post.author.avatar} alt={post.author.name} className="h-8 w-8 lg:h-10 lg:w-10 rounded-full object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                          <span className="font-semibold text-white text-sm">{post.author.name}</span>
                          <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full self-start sm:self-auto">{post.author.role}</span>
                          <span className="text-xs text-gray-400">{post.date}</span>
                        </div>
                        {post.pinned && <Pin className="text-blue-400 h-4 w-4 inline mr-1" />}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="ml-11 lg:ml-13 mb-3">
                      <p className="text-gray-200 text-sm leading-relaxed mb-3">{post.content}</p>
                      
                      {post.image && (
                        <img src={post.image} alt="post" className="rounded-lg max-h-60 lg:max-h-80 w-full object-cover mb-3" />
                      )}
                      
                      {post.video && (
                        <video src={post.video} controls className="rounded-lg max-h-60 lg:max-h-80 w-full mb-3" />
                      )}
                      
                      {post.link && (
                        <a href={post.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 bg-blue-400/10 px-3 py-2 rounded-lg text-sm mb-3 break-all">
                          <LinkIcon size={16} /> <span className="truncate">{post.link}</span>
                        </a>
                      )}
                      
                      {post.type === "tool" && (
                        <div className="inline-flex items-center gap-2 text-green-400 bg-green-400/10 px-3 py-2 rounded-lg text-sm mb-3">
                          <Zap size={16} /> Tool shared in #ai-tools
                        </div>
                      )}
                      
                      {post.type === "poll" && post.poll && (
                        <div className="bg-[#40444B] rounded-lg p-3 mb-3">
                          <div className="font-semibold text-sm text-blue-400 mb-3 flex items-center gap-2">
                            <BarChart3 size={16} /> Poll
                          </div>
                          <div className="space-y-2">
                            {post.poll.options.map((opt, i) => (
                              <button 
                                key={i} 
                                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                                  pollVotes[post.id] === i || post.poll.voted === i 
                                    ? "bg-blue-600 text-white" 
                                    : "bg-[#2B2D31] text-gray-200 hover:bg-[#4F545C]"
                                }`} 
                                disabled={!!pollVotes[post.id] || post.poll.voted !== null} 
                                onClick={() => handleVote(post.id, i)}
                              >
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                                  <span className="truncate">{opt}</span>
                                  <span className="text-xs opacity-75 self-end sm:self-auto">{post.poll.votes[i]} votes</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Actions */}
                    <div className="ml-11 lg:ml-13 flex items-center gap-3 lg:gap-6 text-sm flex-wrap">
                      <button 
                        className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors" 
                        onClick={() => handleLike(post.id)}
                      >
                        <Heart size={16} /> <span className="hidden sm:inline">{post.likes}</span>
                      </button>
                      <button 
                        className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors" 
                        onClick={() => setCommentBox({ ...commentBox, [post.id]: !commentBox[post.id] })}
                      >
                        <MessageCircle size={16} /> <span className="hidden sm:inline">{comments[post.id]?.length || post.comments}</span>
                      </button>
                      <button 
                        className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors" 
                        onClick={() => handleShare(post.id)}
                      >
                        <Share2 size={16} /> <span className="hidden sm:inline">{post.shares}</span>
                      </button>
                      <button 
                        className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors" 
                        onClick={() => handleStartCall(post.id)}
                      >
                        <PhoneCall size={16} /> <span className="hidden sm:inline">Call</span>
                      </button>
                    </div>
                    
                    {/* Comment Box */}
                    {commentBox[post.id] && (
                      <div className="ml-11 lg:ml-13 mt-3 pt-3 border-t border-[#40444B]">
                        <div className="flex flex-col sm:flex-row gap-2 mb-3">
                          <input 
                            className="flex-1 bg-[#40444B] rounded-md px-3 py-2 text-white placeholder-gray-400 border-none focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm" 
                            placeholder="Write a comment..." 
                            value={commentBox[post.id] === true ? "" : commentBox[post.id]} 
                            onChange={e => setCommentBox({ ...commentBox, [post.id]: e.target.value })} 
                          />
                          <button 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors w-full sm:w-auto" 
                            onClick={() => { if (commentBox[post.id]) handleAddComment(post.id, commentBox[post.id]); }}
                          >
                            Comment
                          </button>
                          <button 
                            className="text-gray-400 hover:text-white p-2 rounded-md hover:bg-[#40444B] transition-colors self-center" 
                            onClick={() => setCommentBox({ ...commentBox, [post.id]: false })}
                          >
                            <X size={16} />
                          </button>
                        </div>
                        
                        {/* Comments */}
                        <div className="space-y-2">
                          {(comments[post.id] || []).map((c, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm">
                              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs text-white font-bold flex-shrink-0">
                                {c.user.charAt(0).toUpperCase()}
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="font-semibold text-blue-400">{c.user}</span>
                                <span className="text-gray-200 ml-2 break-words">{c.text}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Members - Responsive */}
      <div className={`
        ${showMembers ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'} 
        fixed lg:relative inset-y-0 right-0 z-40 lg:z-auto
        w-60 bg-[#2B2D31] border-l border-[#40444B] transition-transform duration-300 ease-in-out
        lg:flex-shrink-0 flex flex-col
      `}>
        <div className="p-4 border-b border-[#40444B]">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Online — {mockMembers.filter(m => m.status !== "offline").length}
            </h3>
            <button 
              onClick={() => setShowMembers(false)} 
              className="lg:hidden p-1 text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="p-4 space-y-2 flex-1 overflow-y-auto">
          {mockMembers.map((member, index) => (
            <div key={index} className="flex items-center gap-3 p-2 rounded-md hover:bg-[#40444B] transition-colors">
              <div className="relative flex-shrink-0">
                <img src={member.avatar} alt={member.name} className="h-8 w-8 rounded-full object-cover" />
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#2B2D31] ${getStatusColor(member.status)}`}></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white truncate">{member.name}</span>
                  {getRoleIcon(member.role)}
                </div>
                <div className="text-xs text-gray-400 capitalize truncate">{member.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Overlay - Now with blur effect */}
      {(showSidebar || showMembers) && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => {
            setShowSidebar(false);
            setShowMembers(false);
          }}
        />
      )}
    </div>
  );
} 