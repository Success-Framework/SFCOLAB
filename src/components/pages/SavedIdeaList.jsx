import React, { useState, useEffect, useRef } from "react";
import {
  Bell,
  BellOff,
  CheckCircle,
  AlertCircle,
  Info,
  X,
  Filter,
  Search,
  Clock,
  User,
  MessageSquare,
  Heart,
  TrendingUp,
  Building2,
  Calendar,
  Settings,
  Trash2,
  Archive,
  MoreVertical,
  Bookmark,
  BookmarkMinus,
} from "lucide-react";
import SavedHeader from "./SavedHeader";

const SavedList = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "idea",
      title: "Saved Idea",
      message: "AI-Powered health monitoring.",
      time: "2 minutes ago",
      read: false,
      category: "Ideas",
      sender: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      type: "post",
      title: "Saved Post",
      message: "Savic Edges Media.",
      time: "1 hour ago",
      read: false,
      category: "Posts",
      sender: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      type: "startup",
      title: "Saved Start-Up",
      message: "ABC - Marketing side.",
      time: "3 hours ago",
      read: true,
      category: "Start-Ups",
      sender: "Team Lead",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 4,
      type: "post",
      title: "Saved Post",
      message: "Just completed saving feature on construction page.",
      time: "5 hours ago",
      read: true,
      category: "Posts",
      sender: "Review Board",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    {
      id: 5,
      type: "idea",
      title: "Saved Idea",
      message: "Eco-friendly Delivery Network.",
      time: "1 day ago",
      read: true,
      category: "Ideas",
      sender: "System Admin",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: 6,
      type: "startup",
      title: "Saved Start-Up",
      message: "HealthTech Solutions",
      time: "2 days ago",
      read: true,
      category: "Start-Ups",
      sender: "Project Team",
      avatar: "https://i.pravatar.cc/150?img=6",
    },
  ]);

  // Load notifications from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("notificationsData");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setNotifications(parsed);
        }
      }
    } catch {}
  }, []);

  // Settings state (persisted in localStorage)
  const [settings, setSettings] = useState({
    playSoundOnNew: true,
    enableDesktop: false,
    autoArchiveRead: false,
    confirmBeforeClear: true,
  });

  // Persist notifications in localStorage
  useEffect(() => {
    try {
      localStorage.setItem("notificationsData", JSON.stringify(notifications));
    } catch {}
  }, [notifications]);
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);

  // Menu open state per-notification
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuButtonRefs = useRef({});
  const menuDropdownRefs = useRef({});
  const headerSettingsRef = useRef(null);

  useEffect(() => {
    // Load settings
    try {
      const raw = localStorage.getItem("notifSettings");
      if (raw) {
        const parsed = JSON.parse(raw);
        setSettings((prev) => ({ ...prev, ...parsed }));
      }
    } catch {}
  }, []);

  useEffect(() => {
    // Persist settings
    try {
      localStorage.setItem("notifSettings", JSON.stringify(settings));
    } catch {}
  }, [settings]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Close notification action menu on outside click
      if (openMenuId !== null) {
        const btn = menuButtonRefs.current[openMenuId];
        const dd = menuDropdownRefs.current[openMenuId];
        if (btn && !btn.contains(e.target) && dd && !dd.contains(e.target)) {
          setOpenMenuId(null);
        }
      }
      // Close settings panel on outside click
      if (
        showSettingsPanel &&
        headerSettingsRef.current &&
        !headerSettingsRef.current.contains(e.target)
      ) {
        setShowSettingsPanel(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpenMenuId(null);
        setShowSettingsPanel(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openMenuId, showSettingsPanel]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "idea":
        return <TrendingUp className="h-5 w-5 text-purple-400" />;
      case "startup":
        return <Building2 className="h-5 w-5 text-blue-400" />;
      case "post":
        return <MessageSquare className="h-5 w-5 text-green-400" />;
      default:
        return <Bell className="h-5 w-5 text-gray-400" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "idea":
        return "border-l-purple-500 bg-purple-500/5";
      case "startup":
        return "border-l-blue-500 bg-blue-500/5";
      case "post":
        return "border-l-green-500 bg-green-500/5";
      default:
        return "border-l-gray-500 bg-gray-500/5";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Start-Ups":
        return <Building2 className="h-4 w-4" />;
      case "Ideas":
        return <TrendingUp className="h-4 w-4" />;
      case "Posts":
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      searchQuery === "" ||
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.sender.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab =
      (activeTab === "all" && !notification.archived) ||
      (activeTab === "unread" &&
        !notification.read &&
        !notification.archived) ||
      (activeTab === "archived" && notification.archived);
    const matchesFilter =
      selectedFilter === "all" || notification.category === selectedFilter;

    return matchesSearch && matchesTab && matchesFilter;
  });

  //   const unreadCount = notifications.filter(
  //     (n) => !n.read && !n.archived
  //   ).length;
  //   const totalCount = notifications.filter((n) => !n.archived).length;
  //   const archivedCount = notifications.filter((n) => n.archived).length;

  //   const handleMarkAsRead = (id) => {
  //     setNotifications((prev) =>
  //       prev.map((notification) =>
  //         notification.id === id ? { ...notification, read: true } : notification
  //       )
  //     );
  //   };

  //   const handleMarkAsUnread = (id) => {
  //     setNotifications((prev) =>
  //       prev.map((notification) =>
  //         notification.id === id ? { ...notification, read: false } : notification
  //       )
  //     );
  //   };

  const handleDelete = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  //   const handleArchive = (id) => {
  //     setNotifications((prev) =>
  //       prev.map((notification) =>
  //         notification.id === id
  //           ? { ...notification, archived: true }
  //           : notification
  //       )
  //     );
  //   };

  //   const handleArchiveFiltered = () => {
  //     if (filteredNotifications.length === 0) return;
  //     setNotifications((prev) =>
  //       prev.map((notification) =>
  //         filteredNotifications.some((fn) => fn.id === notification.id)
  //           ? { ...notification, archived: true }
  //           : notification
  //       )
  //     );
  //   };

  //   const handleMarkAllAsRead = () => {
  //     setNotifications((prev) =>
  //       prev.map((notification) => ({ ...notification, read: true }))
  //     );
  //   };

  //   const handleArchiveAll = () => {
  //     setNotifications((prev) =>
  //       prev.map((notification) => ({ ...notification, archived: true }))
  //     );
  //   };

  //   const handleUnarchive = (id) => {
  //     setNotifications((prev) =>
  //       prev.map((notification) =>
  //         notification.id === id
  //           ? { ...notification, archived: false }
  //           : notification
  //       )
  //     );
  //   };

  //   const handleUnarchiveFiltered = () => {
  //     if (filteredNotifications.length === 0) return;
  //     setNotifications((prev) =>
  //       prev.map((notification) =>
  //         filteredNotifications.some((fn) => fn.id === notification.id)
  //           ? { ...notification, archived: false }
  //           : notification
  //       )
  //     );
  //   };

  const handleClearAll = () => {
    if (settings.confirmBeforeClear) {
      const actionLabel =
        activeTab === "archived"
          ? "delete all archived notifications"
          : "clear all visible notifications";
      const ok = window.confirm(
        `Are you sure you want to ${actionLabel}? This cannot be undone.`
      );
      if (!ok) return;
    }
    if (activeTab === "archived") {
      // Delete only archived items that are currently visible under filters/search
      setNotifications((prev) =>
        prev.filter(
          (n) =>
            !(n.archived && filteredNotifications.some((fn) => fn.id === n.id))
        )
      );
    } else {
      // Remove only currently visible non-archived notifications
      setNotifications((prev) =>
        prev.filter((n) => !filteredNotifications.some((fn) => fn.id === n.id))
      );
    }
  };

  //   const handleDismissAll = () => {
  //     setNotifications((prev) =>
  //       prev.map((notification) => ({ ...notification, read: true }))
  //     );
  //   };

  const maybeShowDesktopNotification = (title, body) => {
    if (!settings.enableDesktop || typeof Notification === "undefined") return;
    try {
      if (Notification.permission === "granted") {
        new Notification(title, { body });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((perm) => {
          if (perm === "granted") {
            new Notification(title, { body });
          }
        });
      }
    } catch {}
  };

  const handleRefreshNotifications = () => {
    // In a real app, this would fetch new notifications from the backend
    // For now, we'll just add a new mock notification
    const newNotification = {
      id: Date.now(),
      type: "info",
      title: "System Update",
      message: "New features have been added to the platform. Check them out!",
      time: "Just now",
      read: false,
      category: "system",
      sender: "System",
      avatar: "https://i.pravatar.cc/150?img=7",
    };
    setNotifications((prev) => [newNotification, ...prev]);

    // Desktop notification (optional)
    maybeShowDesktopNotification(
      newNotification.title,
      newNotification.message
    );

    // Play notification sound (optional)
    if (settings.playSoundOnNew) {
      try {
        // Create a simple notification sound
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(
          600,
          audioContext.currentTime + 0.1
        );

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.2
        );

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
      } catch (error) {
        // Fallback if audio context is not supported
        // console.log("Notification sound not supported");
      }
    }

    // Auto-archive read notifications if setting enabled
    // if (settings.autoArchiveRead) {
    //   setNotifications((prev) =>
    //     prev.map((n) => (n.read ? { ...n, archived: true } : n))
    //   );
    // }
  };

  return (
    <div className="w-full p-4 px-2 max-sm:px-0 space-y-6">
      {/* Header Section */}
      <SavedHeader
        onRefresh={handleRefreshNotifications}
        settings={settings}
        setSettings={setSettings}
        showSettings={showSettingsPanel}
        setShowSettings={setShowSettingsPanel}
        isArchivedTab={activeTab === "archived"}
        disabledArchiveAction={filteredNotifications.length === 0}
        headerSettingsRef={headerSettingsRef}
      />

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notifications..."
              className="w-full px-4 py-2.5 pl-12 bg-white/10 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-400 transition-all duration-200"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 text-gray-400" />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 border border-white/10 hover:border-white/20"
          >
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">Filter</span>
          </button>
        </div>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            {["all", "Ideas", "Start-Ups", "Posts"].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedFilter === filter
                    ? "bg-blue-500 text-white"
                    : "bg-white/10 hover:bg-white/20 text-gray-300"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap sm:flex-nowrap border-b border-white/10 gap-x-0 overflow-x-auto">
        {[
          { key: "all", label: "All" },
          // { key: "unread", label: "Unread", count: unreadCount },
          // { key: "archived", label: "Archived" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-3 text-xs font-medium transition-all duration-200 relative ${
              activeTab === tab.key
                ? "text-white border-b-2 border-blue-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}
            {typeof tab.count === "number" && tab.count > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-white/10 rounded-full text-xs">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <BookmarkMinus className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-400 mb-2">
              {searchQuery || selectedFilter !== "all"
                ? "No notifications found"
                : "All caught up!"}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {searchQuery || selectedFilter !== "all"
                ? "Try adjusting your search or filters"
                : "You're all caught up! Check back later for updates."}
            </p>
            {(searchQuery || selectedFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedFilter("all");
                }}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`group p-4 rounded-xl border-l-4 transition-all duration-200 hover:bg-white/5  ${getNotificationColor(
                notification.type
              )} `}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    {/* Hover Mark as Read Button */}
                    {/* {!notification.read && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="absolute left-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-green-500/20 rounded-lg text-green-400 hover:text-green-300"
                        title="Mark as read"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                    )} */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-white max-sm:text-sm">
                          {notification.title}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          {getCategoryIcon(notification.category)}
                          <span>{notification.category}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300 mb-2 line-clamp-2 max-sm:text-xs">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{notification.sender}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{notification.time}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      )} */}

                      {/* Quick Mark as Read Button for Unread Notifications */}
                      {/* {!notification.read && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="p-1.5 hover:bg-green-500/20 rounded-lg transition-colors text-green-400 hover:text-green-300"
                          title="Mark as read"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      )} */}

                      <div className="relative">
                        <button
                          ref={(el) => {
                            menuButtonRefs.current[notification.id] = el;
                          }}
                          onClick={() =>
                            setOpenMenuId((cur) =>
                              cur === notification.id ? null : notification.id
                            )
                          }
                          className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                          title="More actions"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                        {openMenuId === notification.id && (
                          <div
                            ref={(el) => {
                              menuDropdownRefs.current[notification.id] = el;
                            }}
                            className="absolute right-0 top-full mt-1 w-44 bg-[#1A1A1A] border border-white/20 rounded-lg shadow-lg py-1 z-50"
                          >
                            {/* {!notification.read ? (
                              <button
                                onClick={() => {
                                  handleMarkAsRead(notification.id);
                                  setOpenMenuId(null);
                                }}
                                className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                              >
                                Mark as read
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  handleMarkAsUnread(notification.id);
                                  setOpenMenuId(null);
                                }}
                                className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                              >
                                Mark as unread
                              </button>
                            )} */}
                            {/* {!notification.archived ? (
                              <button
                                onClick={() => {
                                  handleArchive(notification.id);
                                  setOpenMenuId(null);
                                }}
                                className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                              >
                                Archive
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  handleUnarchive(notification.id);
                                  setOpenMenuId(null);
                                }}
                                className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                              >
                                Unarchive
                              </button>
                            )} */}
                            <button
                              onClick={() => {
                                handleDelete(notification.id);
                                setOpenMenuId(null);
                              }}
                              className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bulk Actions */}
      {filteredNotifications.length > 0 && (
        <div className="flex items-center justify-between pt-4 border-t border-white/10 max-sm:flex-col max-sm:items-start max-sm:gap-2 max-sm:hidden">
          <div className="text-sm text-gray-400">
            {filteredNotifications.length} of{" "}
            {/* {activeTab === "archived" ? archivedCount : totalCount} notification
            {(activeTab === "archived" ? archivedCount : totalCount) !== 1
              ? "s"
              : ""} */}{" "}
            shown
          </div>
          <div className="flex gap-2">
            {/* {activeTab !== "archived" && (
              <button
                onClick={handleMarkAllAsRead}
                disabled={unreadCount === 0}
                className="px-4 py-2 text-sm max-sm:text-xs bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                Mark all as read
              </button>
            )} */}
            {/* {activeTab !== "archived" ? (
              <button
                onClick={handleArchiveAll}
                disabled={totalCount === 0}
                className="px-4 py-2 text-sm  bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                Archive all
              </button>
            ) : (
              <button
                onClick={handleUnarchiveFiltered}
                disabled={filteredNotifications.length === 0}
                className="px-4 py-2 text-sm  bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                Unarchive visible
              </button>
            )} */}
            <button
              onClick={handleClearAll}
              className="px-4 py-2 text-sm  bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedList;
