import { useState, useRef } from "react"
import { Phone, Send, Search, MoreVertical, File, X } from "lucide-react"

const contacts = [
  {
    id: "1",
    name: "Elmer Laverty",
    avatar: "/placeholder.svg",
    status: "online",
    isOnline: true,
    lastMessage: "Haha oh nice 🔥",
  },
  {
    id: "2",
    name: "Tom Julies",
    avatar: "/placeholder.svg",
    status: "online",
    isOnline: true,
    lastMessage: "Available",
  },
  {
    id: "3",
    name: "Lavern Laboy",
    avatar: "/placeholder.svg",
    status: "online",
    isOnline: true,
    lastMessage: "Haha that's terrifying 😱",
  },
  {
    id: "4",
    name: "Titus Kitsemura",
    avatar: "/placeholder.svg",
    status: "online",
    isOnline: false,
    lastMessage: "omg, this is amazing",
  },
  {
    id: "5",
    name: "Geoffrey Mott",
    avatar: "/placeholder.svg",
    status: "online",
    isOnline: true,
    lastMessage: "aww",
  },
  {
    id: "6",
    name: "Alfonso Schuessler",
    avatar: "/placeholder.svg",
    status: "online",
    isOnline: false,
    lastMessage: "perfect",
  },
]

const messages = [
  { id: "1", sender: "Tom Julies", content: "omg, this is amazing", timestamp: "10:30 AM", isOwn: false },
  { id: "2", sender: "Tom Julies", content: "perfect 😍", timestamp: "10:31 AM", isOwn: false },
  { id: "3", sender: "Tom Julies", content: "Wow, this is really epic", timestamp: "10:32 AM", isOwn: false },
  { id: "4", sender: "Tom Julies", content: "just ideas for next time", timestamp: "10:45 AM", isOwn: false },
  { id: "5", sender: "Tom Julies", content: "I'll be there in 2 mins 😊", timestamp: "10:46 AM", isOwn: false },
  { id: "6", sender: "You", content: "woohoooo", timestamp: "11:20 AM", isOwn: true },
  { id: "7", sender: "You", content: "Haha oh man", timestamp: "11:21 AM", isOwn: true },
  { id: "8", sender: "You", content: "Haha that's terrifying 😱", timestamp: "11:22 AM", isOwn: true },
  { id: "9", sender: "Tom Julies", content: "aww", timestamp: "11:25 AM", isOwn: false },
  { id: "10", sender: "Tom Julies", content: "omg, this is amazing", timestamp: "11:26 AM", isOwn: false },
  { id: "11", sender: "Tom Julies", content: "woohoooo 🔥", timestamp: "11:27 AM", isOwn: false },
]

export default function Chat() {
  const [selectedContact, setSelectedContact] = useState(contacts[1])
  const [newMessage, setNewMessage] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const fileInputRef = useRef(null)

  // Responsive: show sidebar on mobile when toggled, always on desktop
  // Hide sidebar on mobile when in chat view

  return (
    <div className="flex flex-col h-screen bg-[#181818] text-white md:flex-row">
      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#000] border-b border-[#222]">
        <button
          className="text-white focus:outline-none"
          onClick={() => setSidebarOpen(true)}
        >
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold">Messages</h1>
        <div className="text-sm bg-[#181818] px-2 py-1 rounded">{contacts.length}</div>
      </div>

      {/* Sidebar */}
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div
        className={`
          fixed z-50 top-0 left-0 h-full w-72 bg-[#000] flex flex-col transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:w-80 md:z-0 md:h-auto
        `}
        style={{ maxWidth: "100vw" }}
      >
        {/* Close button for mobile */}
        <div className="md:hidden flex justify-end p-4">
          <button
            className="text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 pt-0 md:pt-4">
          <div className="hidden md:flex gap-4 items-center mb-4">
            <h1 className="text-xl font-semibold">Messages</h1>
            <div className="text-sm bg-[#181818] px-2 py-1 rounded">{contacts.length}</div>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages"
              className="w-full px-3 py-2 bg-[#181818] border-[#2d2d2d] border rounded-lg text-white placeholder-gray-400"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>
        <div className="overflow-y-auto flex-1">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => {
                setSelectedContact(contact)
                setSidebarOpen(false)
              }}
              className={`p-4 cursor-pointer hover:bg-[#181818] transition ${
                selectedContact.id === contact.id ? "bg-[#181818]" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full bg-gray-600" />
                  {contact.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-gray-800 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{contact.name}</p>
                  <p className="text-sm text-gray-400 truncate">{contact.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col h-full min-h-0">
        {/* Chat Header */}
        <div className="p-4 flex justify-between items-center border-b border-[#222] bg-[#181818]">
          <div className="flex items-center space-x-3">
         
            <div className="relative">
              <img src={selectedContact.avatar} alt={selectedContact.name} className="w-10 h-10 rounded-full bg-gray-600" />
              {selectedContact.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-gray-800 rounded-full"></div>
              )}
            </div>
            <div>
              <h2 className="font-semibold text-base sm:text-lg">{selectedContact.name}</h2>
              <p className="text-xs sm:text-sm text-green-400">{selectedContact.status}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-gray-400 bg-zinc-700 px-3 py-1.5 sm:px-4 sm:py-2 hover:text-white flex items-center text-xs sm:text-sm rounded">
              <Phone className="w-4 h-4 mr-1" /> <span className="hidden xs:inline">Call</span>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-3 sm:space-y-4 scroll-auto min-h-0">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
              <div className="flex items-start space-x-2 max-w-[80vw] sm:max-w-xs md:max-w-md">
                {!message.isOwn && (
                  <img
                    src={selectedContact.avatar}
                    alt={selectedContact.name}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-black"
                  />
                )}
                <div
                  className={`px-3 py-2 sm:px-4 sm:py-2 rounded-2xl break-words ${
                    message.isOwn ? "bg-[#2B3135] text-white ml-auto" : "bg-white text-black"
                  }`}
                >
                  <p className="text-xs sm:text-sm">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-2 sm:p-4 bg-[#181818]">
          <div className="flex items-center space-x-2">
            <div className="relative">
              {!selectedFile ? (
                <>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    className="p-2 text-gray-400 hover:text-white"
                  >
                    <File className="w-5 h-5" />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*,video/*,application/pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"
                    onChange={e => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedFile(e.target.files[0]);
                      }
                    }}
                  />
                </>
              ) : (
                <div className="flex items-center space-x-1 bg-gray-700 px-2 py-1 rounded">
                  {selectedFile.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="preview"
                      className="w-8 h-8 object-cover rounded"
                    />
                  ) : selectedFile.type.startsWith("video/") ? (
                    <video
                      src={URL.createObjectURL(selectedFile)}
                      className="w-8 h-8 object-cover rounded"
                      controls
                    />
                  ) : (
                    <span className="text-xs truncate max-w-[80px]">{selectedFile.name}</span>
                  )}
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="text-red-400 hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    // Handle send message and file
                    setNewMessage("");
                    setSelectedFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }
                }}
                className="w-full px-3 sm:px-4 py-2 pr-10 border border-[#2B3135] rounded-full text-white placeholder-gray-400 text-xs sm:text-sm"
              />
              <button
                onClick={() => {
                  // Handle send message and file
                  setNewMessage("");
                  setSelectedFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-[#1e1e1e] p-2 rounded text-white"
                style={{ lineHeight: 0 }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
