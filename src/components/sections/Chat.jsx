import { useState, useRef, useEffect } from "react";
import { Phone, Send, Search, MoreVertical, File, X , Download } from "lucide-react";
import io from "socket.io-client";

// Default contacts data
const defaultContacts = [
  {
    id: "1",
    name: "Elmer Laverty",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHx8MHx8fDA%3D",
    status: "online",
    isOnline: true,
    lastMessage: "",
  },
  {
    id: "2",
    name: "Tom Julies",
    avatar:
      "https://images.unsplash.com/photo-1672863601285-253fc82db868?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHVzZXJzfGVufDB8fDB8fHww",
    status: "online",
    isOnline: true,
    lastMessage: "",
  },
  {
    id: "3",
    name: "Lavern Laboy",
    avatar:
      "https://images.unsplash.com/photo-1685903772095-f07172808761?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHVzZXJzfGVufDB8fDB8fHww",
    status: "online",
    isOnline: true,
    lastMessage: "",
  },
  {
    id: "4",
    name: "Titus Kitsemura",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnN8ZW58MHx8MHx8fDA%3D",
    status: "online",
    isOnline: false,
    lastMessage: "",
  },
  {
    id: "5",
    name: "Geoffrey Mott",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: "online",
    isOnline: true,
    lastMessage: "",
  },
  {
    id: "6",
    name: "Alfonso Schuessler",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnN8ZW58MHx8MHx8fDA%3D",
    status: "online",
    isOnline: false,
    lastMessage: "",
  },
];

export default function Chat() {
  // State management
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [unsentMessages, setUnsentMessages] = useState([]);

  // Refs
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Configuration
  const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3001";

  // Get user ID from URL or default
  const getSessionUserKey = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("testUserId") || "1";
  };

  // Initialize application
  useEffect(() => {
    const initializeApp = () => {
      const sessionUserId = getSessionUserKey();
      setCurrentUserId(sessionUserId);

      // Load data from localStorage
      const savedContacts = localStorage.getItem("chatContacts");
      const savedMessages = localStorage.getItem("chatMessages");

      if (savedContacts) {
        const parsedContacts = JSON.parse(savedContacts);
        setContacts(parsedContacts);
        setSelectedContact(parsedContacts[1] || parsedContacts[0]);
      } else {
        setContacts(defaultContacts);
        setSelectedContact(defaultContacts[1] || defaultContacts[0]);
        localStorage.setItem("chatContacts", JSON.stringify(defaultContacts));
      }

      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages);
        const sortedMessages = parsedMessages.sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );
        setMessages(sortedMessages);
      }

      // Initialize socket connection
      const newSocket = io(SOCKET_URL, {
        autoConnect: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        transports: ["websocket"],
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    };

    initializeApp();
  }, []);

  // Handle reconnection and sending queued messages
  useEffect(() => {
    if (!socket || !isConnected || unsentMessages.length === 0) return;

    const sendQueuedMessages = async () => {
      const successfulMessages = [];
      const failedMessages = [];

      for (const message of unsentMessages) {
        try {
          await new Promise((resolve) => {
            socket.emit("sendMessage", message, (response) => {
              if (response?.status === "success") {
                successfulMessages.push(message.tempId);
                updateMessageStatus(
                  message.tempId,
                  "delivered",
                  response.message
                );
              } else {
                failedMessages.push(message.tempId);
                updateMessageStatus(message.tempId, "failed");
              }
              resolve();
            });
          });
        } catch (err) {
          console.error("Error sending queued message:", err);
          failedMessages.push(message.tempId);
        }
      }

      // Remove successfully sent messages from queue
      setUnsentMessages((prev) =>
        prev.filter((msg) => !successfulMessages.includes(msg.tempId))
      );
    };

    sendQueuedMessages();
  }, [isConnected, socket, unsentMessages]);

  // Update message status in state and localStorage
  const updateMessageStatus = (tempId, status, serverMessage = null) => {
    setMessages((prevMessages) => {
      const updatedMessages = prevMessages.map((msg) => {
        if (msg.id === tempId) {
          return serverMessage
            ? { ...serverMessage, isOwn: true }
            : { ...msg, status };
        }
        return msg;
      });

      localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
      return updatedMessages;
    });
  };

  // Socket event handlers
  useEffect(() => {
    if (!socket || !currentUserId) return;

    const onConnect = () => {
      setIsConnected(true);
      setConnectionStatus("connected");
      console.log("Connected to server");
      socket.emit("setUser", currentUserId);
    };

    const onDisconnect = () => {
      setIsConnected(false);
      setConnectionStatus("disconnected");
      console.log("Disconnected from server");
    };

    const onConnectError = (err) => {
      console.error("Connection error:", err);
      setConnectionStatus("error");
    };

    const onReconnectAttempt = (attempt) => {
      setConnectionStatus(`reconnecting (${attempt}/5)`);
      console.log(`Reconnection attempt ${attempt}`);
    };

    const onReconnectFailed = () => {
      setConnectionStatus("failed");
      console.error("Reconnection failed");
    };

    const handleIncomingMessage = (message) => {
      // Check if this is a duplicate message
      setMessages((prevMessages) => {
        if (prevMessages.some((m) => m.id === message.id)) return prevMessages;

        const updatedMessages = [...prevMessages, message].sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );

        localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
        return updatedMessages;
      });

      // Update last message in contacts if this is a new message
      if (!message.isOwn) {
        setContacts((prevContacts) => {
          const updatedContacts = prevContacts.map((contact) => {
            if (contact.id === message.senderId) {
              return {
                ...contact,
                lastMessage:
                  message.content ||
                  (message.file ? `File: ${message.file.name}` : ""),
              };
            }
            return contact;
          });
          localStorage.setItem("chatContacts", JSON.stringify(updatedContacts));
          return updatedContacts;
        });
      }
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectError);
    socket.on("reconnect_attempt", onReconnectAttempt);
    socket.on("reconnect_failed", onReconnectFailed);
    socket.on("newMessage", handleIncomingMessage);
    // socket.on("messageDelivered", handleIncomingMessage);

    return () => {
      // Clean up event listeners
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onConnectError);
      socket.off("reconnect_attempt", onReconnectAttempt);
      socket.off("reconnect_failed", onReconnectFailed);
      socket.off("newMessage", handleIncomingMessage);
      // socket.off("messageDelivered", handleIncomingMessage);
    };
  }, [socket, currentUserId, selectedContact?.id]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message function
  const sendMessage = async () => {
    // Add async here
    if (!currentUserId || !selectedContact) {
      console.error("Cannot send message - missing user or contact");
      return;
    }

    if (!newMessage.trim() && !selectedFile) return;

    const tempId = `temp-${Date.now()}`;
    let fileData = null;

    if (selectedFile) {
      try {
        const fileBuffer = await selectedFile.arrayBuffer();
        fileData = {
          name: selectedFile.name,
          type: selectedFile.type,
          size: selectedFile.size,
          data: Array.from(new Uint8Array(fileBuffer)), // Convert to byte array
        };
      } catch (err) {
        console.error("Error reading file:", err);
        return;
      }
    }

    const message = {
      id: tempId,
      senderId: currentUserId,
      senderName: "You",
      recipientId: selectedContact.id,
      content: newMessage,
      file: fileData,
      timestamp: new Date().toISOString(),
      isOwn: true,
      status: "sending",
    };

    // Optimistic UI update with temporary ID
    setMessages((prev) => [...prev, message]);

    if (isConnected && socket) {
      socket.emit(
        "sendMessage",
        {
          ...message,
          id: undefined,
          tempId,
        },
        (response) => {
          if (response?.status === "success") {
            // Replace the temporary message with the server-verified one
            setMessages((prev) =>
              prev.map((m) => (m.id === tempId ? response.message : m))
            );

            // Update localStorage
            const savedMessages = JSON.parse(
              localStorage.getItem("chatMessages") || "[]"
            );
            const updatedMessages = savedMessages
              .filter((m) => m.id !== tempId)
              .concat(response.message);
            localStorage.setItem(
              "chatMessages",
              JSON.stringify(updatedMessages)
            );
          } else {
            // Mark as failed
            setMessages((prev) =>
              prev.map((m) =>
                m.id === tempId ? { ...m, status: "failed" } : m
              )
            );
          }
        }
      );
    } else {
      // Queue message for later sending
      setUnsentMessages((prev) => [...prev, { ...message, tempId }]);
      setMessages((prev) =>
        prev.map((m) => (m.id === tempId ? { ...m, status: "queued" } : m))
      );
    }

    setNewMessage("");
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  // This is for the download of files
  const handleDownload = (file) => {
    if (!file.data) return;

    // Convert byte array back to Blob
    const byteArray = new Uint8Array(file.data);
    const blob = new Blob([byteArray], { type: file.type });

    // Create download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  // Render connection status badge
  const renderConnectionStatus = () => {
    const statusColors = {
      connected: "bg-green-500",
      disconnected: "bg-red-500",
      reconnecting: "bg-yellow-500",
      error: "bg-red-700",
      failed: "bg-red-900",
    };

    return (
      <div className="fixed bottom-4 right-4 flex items-center z-50">
        <div
          className={`w-3 h-3 rounded-full mr-2 ${statusColors[connectionStatus]}`}
        ></div>
        <span className="text-xs capitalize">
          {connectionStatus}
          {unsentMessages.length > 0 && ` (${unsentMessages.length} queued)`}
        </span>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-[#181818] text-white md:flex-row">
      {/* Connection status indicator */}
      {renderConnectionStatus()}

      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#000] border-b border-[#222]">
        <button
          className="text-white focus:outline-none"
          onClick={() => setSidebarOpen(true)}
        >
          <svg
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold">Messages</h1>
        <div className="text-sm bg-[#181818] px-2 py-1 rounded">
          {contacts.length}
        </div>
      </div>

      {/* Sidebar Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
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

        {/* Sidebar Content */}
        <div className="p-4 pt-0 md:pt-4">
          <div className="hidden md:flex gap-4 items-center mb-4">
            <h1 className="text-xl font-semibold">Messages</h1>
            <div className="text-sm bg-[#181818] px-2 py-1 rounded">
              {contacts.length}
            </div>
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

        {/* Contacts List */}
        <div className="overflow-y-auto flex-1">
          {contacts
            .filter((c) => c.id !== currentUserId)
            .map((contact) => (
              <div
                key={contact.id}
                onClick={() => {
                  setSelectedContact(contact);
                  setSidebarOpen(false);
                }}
                className={`p-4 cursor-pointer hover:bg-[#181818] transition ${
                  selectedContact?.id === contact.id ? "bg-[#181818]" : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-10 h-10 rounded-full bg-gray-600"
                    />
                    {contact.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-gray-800 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {contact.name}
                    </p>
                    <p className="text-sm text-gray-400 truncate">
                      {contact.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col h-full min-h-0">
        {/* Chat Header */}
        {selectedContact && (
          <div className="p-4 flex justify-between items-center border-b border-[#222] bg-[#181818]">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={selectedContact.avatar}
                  alt={selectedContact.name}
                  className="w-10 h-10 rounded-full bg-gray-600"
                />
                {selectedContact.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-gray-800 rounded-full"></div>
                )}
              </div>
              <div>
                <h2 className="font-semibold text-base sm:text-lg">
                  {selectedContact.name}
                </h2>
                <p className="text-xs sm:text-sm text-green-400">
                  {selectedContact.status}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              
              <button className="text-gray-400  px-3 py-1.5 sm:px-4 sm:py-2 hover:text-white flex items-center text-xs sm:text-sm rounded">
                <Search className="w-4 h-4 mr-1" />{" "}
              </button>
              <button className="text-gray-400 bg-zinc-700 px-3 py-1.5 sm:px-4 sm:py-2 hover:text-white flex items-center text-xs sm:text-sm rounded">
                <Phone className="w-4 h-4 mr-1" />{" "}
                <span className="hidden xs:inline">Call</span>
              </button>
            </div>
          </div>
        )}

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-3 sm:space-y-4 scroll-auto min-h-0">
          {messages
            .filter(
              (msg) =>
                (msg.senderId === selectedContact?.id &&
                  msg.recipientId === currentUserId) ||
                (msg.senderId === currentUserId &&
                  msg.recipientId === selectedContact?.id)
            )
            .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
            .map((message) => {
              const isOwn = message.senderId === currentUserId;
              const isFailed = message.status === "failed";
              const isQueued = message.status === "queued";
              const isSending = message.status === "sending";

              return (
                <div
                  key={message.id}
                  className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex items-start space-x-2 max-w-[80vw] sm:max-w-xs md:max-w-md">
                    {!isOwn && (
                      <img
                        src={selectedContact?.avatar}
                        alt={selectedContact?.name}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-black"
                      />
                    )}
                    <div
                      className={`px-3 py-2 sm:px-4 sm:py-2 rounded-2xl break-words relative ${
                        isOwn
                          ? "bg-[#2B3135] text-white"
                          : "bg-white text-black"
                      } ${isFailed || isQueued ? "opacity-70" : ""}`}
                    >
                      {(isFailed || isQueued || isSending) && (
                        <div
                          className={`absolute -top-2 -right-2 text-white text-xs px-1 rounded-full ${
                            isFailed
                              ? "bg-red-500"
                              : isQueued
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                          }`}
                        >
                          {isFailed
                            ? "Failed"
                            : isQueued
                            ? "Queued"
                            : "Sending..."}
                        </div>
                      )}
                      {message.file && (
                        <div className="mb-1 bg-gray-200 text-black p-2 rounded">
                          <div className="text-xs text-gray-600">
                             {message.file.name}
                          </div>
                          <button
                            onClick={() => handleDownload(message.file)}
                            className="mt-1 text-xs bg-gray-200 text-white px-2 py-1 rounded"
                          >
                            <Download className="mr-4 text-black text-xs mt-2 hover:text-gray-400"/>
                          </button>
                        </div>
                      )}
                      <p className="text-xs sm:text-sm">{message.content}</p>
                      <div className="text-right text-xs text-gray-400 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-2 sm:p-4 bg-[#181818]">
          <div className="flex items-center space-x-2">
            <div className="relative">
              {!selectedFile ? (
                <>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-gray-400 hover:text-white"
                    disabled={!isConnected && unsentMessages.length > 0}
                  >
                    <File className="w-5 h-5" />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*,video/*,application/pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setSelectedFile(e.target.files[0]);
                      }
                    }}
                    disabled={!isConnected && unsentMessages.length > 0}
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
                    <span className="text-xs truncate max-w-[80px]">
                      {selectedFile.name}
                    </span>
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
                placeholder={
                  isConnected
                    ? "Type a message..."
                    : unsentMessages.length > 0
                    ? "Reconnecting... (messages queued)"
                    : "Connecting..."
                }
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                className={`w-full px-3 sm:px-4 py-2 pr-10 border rounded-full text-white placeholder-gray-400 text-xs sm:text-sm ${
                  isConnected
                    ? "border-[#2B3135] bg-[#2B3135]"
                    : "border-gray-700 bg-gray-800"
                }`}
                disabled={!isConnected && unsentMessages.length > 0}
              />
              <button
                onClick={sendMessage}
                disabled={
                  (!isConnected && unsentMessages.length === 0) ||
                  (!newMessage.trim() && !selectedFile)
                }
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded ${
                  (isConnected || unsentMessages.length > 0) &&
                  (newMessage.trim() || selectedFile)
                    ? "text-white hover:bg-[#1e1e1e]"
                    : "text-gray-500 cursor-not-allowed"
                }`}
                style={{ lineHeight: 0 }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
