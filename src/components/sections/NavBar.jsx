import { BellDot, SquareMenu } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { allimg } from "../../utils";
import { io } from "socket.io-client";

const NavBar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const menuRef = useRef(null);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  
  // Connection status state
  const [connectionStatus, setConnectionStatus] = useState({
    isConnected: false,
    status: "disconnected",
    lastError: null
  });

  // Socket ref
  const socketRef = useRef(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Get user ID from URL or default (same as chat.jsx)
  const getSessionUserKey = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("testUserId") || "1"; 
  };

  // Initialize socket connection
  useEffect(() => {
    const sessionUserId = getSessionUserKey();
    setCurrentUserId(sessionUserId);

    if (!sessionUserId) return;

    const SOCKET_URL = import.meta.env.REACT_APP_SOCKET_URL || "http://localhost:3001";

    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
      autoConnect: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 10000
    });

    socketRef.current = socket;

    // Connection handlers
    const handleConnect = () => {
      console.log("✅ Socket connected for notifications");
      setConnectionStatus({
        isConnected: true,
        status: "connected",
        lastError: null
      });
      
      // Authenticate and subscribe to notifications
      socket.emit("setUser", sessionUserId);
      socket.emit("subscribeToNotifications", sessionUserId);
    };

    const handleDisconnect = () => {
      console.log("❌ Socket disconnected");
      setConnectionStatus(prev => ({
        ...prev,
        isConnected: false,
        status: "disconnected"
      }));
    };

    const handleConnectError = (err) => {
      console.error("⚠️ Connection error:", err);
      setConnectionStatus({
        isConnected: false,
        status: "error",
        lastError: err.message
      });
    };

    const handleReconnecting = (attempt) => {
      console.log(`Attempting to reconnect (${attempt}/5)`);
      setConnectionStatus(prev => ({
        ...prev,
        status: `reconnecting (${attempt}/5)`
      }));
    };

    const handleReconnectFailed = () => {
      console.error("Reconnection failed");
      setConnectionStatus(prev => ({
        ...prev,
        status: "error",
        lastError: "Reconnection failed"
      }));
    };

    // Notification handler
    const handleNotification = (notification) => {
      console.log("New notification received:", notification);
      setNotifications(prev => [
        {
          ...notification,
          id: notification.id || Date.now().toString(),
          isRead: false,
          timestamp: notification.timestamp || new Date().toISOString()
        },
        ...prev
      ]);
      setUnreadCount(prev => prev + 1);
      
      // Show browser notification if permission granted and tab not focused
      if (Notification.permission === "granted" && document.visibilityState !== "visible") {
        new Notification(notification.title || "New Notification", {
          body: notification.message || notification.body,
          icon: allimg.profileImg
        });
      }
    };

    // Set up event listeners
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleConnectError);
    socket.on("reconnecting", handleReconnecting);
    socket.on("reconnect_failed", handleReconnectFailed);
    socket.on("newNotification", handleNotification);

    return () => {
      // Cleanup on unmount
      if (socketRef.current) {
        socketRef.current.off("connect", handleConnect);
        socketRef.current.off("disconnect", handleDisconnect);
        socketRef.current.off("connect_error", handleConnectError);
        socketRef.current.off("reconnecting", handleReconnecting);
        socketRef.current.off("reconnect_failed", handleReconnectFailed);
        socketRef.current.off("newNotification", handleNotification);
        socketRef.current.emit("unsubscribeFromNotifications", sessionUserId);
        socketRef.current.disconnect();
      }
    };
  }, []);

  // Request notification permission on mount
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then(permission => {
        console.log("Notification permission:", permission);
      });
    }
  }, []);

  // Mark notifications as read when dropdown opens
  const handleNotificationClick = () => {
    const dropdownName = "notification";
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);

    if (activeDropdown !== dropdownName && unreadCount > 0) {
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
      
      // Notify server that notifications were read
      if (socketRef.current?.connected && currentUserId) {
        const unreadIds = notifications
          .filter(n => !n.isRead)
          .map(n => n.id);
        
        if (unreadIds.length > 0) {
          socketRef.current.emit("markAsRead", unreadIds);
        }
      }
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (activeDropdown === "menu" && menuRef.current && !menuRef.current.contains(event.target)) ||
        (activeDropdown === "notification" && notificationRef.current && !notificationRef.current.contains(event.target)) ||
        (activeDropdown === "profile" && profileRef.current && !profileRef.current.contains(event.target))
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeDropdown]);

  // Connection status indicator
  // const renderConnectionStatus = () => {
  //   const statusColors = {
  //     connected: "bg-green-500",
  //     reconnecting: "bg-yellow-500",
  //     disconnected: "bg-gray-500",
  //     error: "bg-red-500"
  //   };

  //   const status = connectionStatus.status.split(" ")[0];
  //   return (
  //     <div className="fixed bottom-4 right-4 flex items-center z-50">
  //       <div className={`w-3 h-3 rounded-full mr-2 ${statusColors[status] || "bg-gray-500"}`}></div>
  //       <span className="text-xs capitalize">{connectionStatus.status}</span>
  //     </div>
  //   );
  // };
  
  return (
    <nav className="flex px-5 items-center w-full h-full justify-between relative">
      {/* Logo */}
      <div className="logo">
        <Link className="text-white text-xl font-bold">SFCOLAB</Link>
      </div>

      {/* Main content */}
      <div className="content items-center h-full flex gap-4">
        {/* Messages dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setActiveDropdown(activeDropdown === "menu" ? null : "menu")}
            className="text-xl font-medium text-[#C4C4C4]"
          >
            <SquareMenu />
          </button>
          {activeDropdown === "menu" && (
            <div className="absolute right-0 mt-2 w-48 bg-[black] rounded-lg shadow-lg py-2 z-50">
              <Link to="/messages" className="block px-4 py-2 text-white hover:bg-white/10">
                Messages
              </Link>
              <Link to="/setting" className="block px-4 py-2 text-white hover:bg-white/10">
                Settings
              </Link>
            </div>
          )}
        </div>

        {/* Notification dropdown */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={handleNotificationClick}
            className="relative text-xl font-medium text-[#C4C4C4]"
          >
            <BellDot />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
          {activeDropdown === "notification" && (
            <div className="absolute right-0 mt-2 w-64 bg-[#120C18] rounded-lg shadow-lg py-2 z-50 max-h-64 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-4 py-2 text-white">No notifications</div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-4 py-2 text-white border-b border-white/10 hover:bg-white/5 cursor-pointer ${
                      !notification.isRead ? "bg-blue-900/20" : ""
                    }`}
                  >
                    <p className="font-semibold">{notification.title || "Notification"}</p>
                    <p className="text-sm text-gray-400 truncate">
                      {notification.message || notification.body}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(notification.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Profile dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setActiveDropdown(activeDropdown === "profile" ? null : "profile")}
            className="w-10 h-10 rounded-full overflow-hidden"
          >
            <img
              src={allimg.profileImg}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </button>
          {activeDropdown === "profile" && (
            <div className="absolute right-0 mt-2 w-48 bg-[#120C18] rounded-lg shadow-lg py-2 z-50">
              <Link to="/profile" className="block px-4 py-2 text-white hover:bg-white/10">
                Profile
              </Link>
              <Link to="/setting" className="block px-4 py-2 text-white hover:bg-white/10">
                Settings
              </Link>
              <Link to="/logout" className="block px-4 py-2 text-white hover:bg-white/10">
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Connection status indicator */}
      {/* {renderConnectionStatus()} */}
    </nav>
  );
};

export default NavBar;