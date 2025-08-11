import React, { useState } from "react";
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
} from "lucide-react";

const Notifications = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [showFilters, setShowFilters] = useState(false);
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: "success",
            title: "Project Update",
            message: "Your project 'ABC Marketing' has been successfully updated with new features.",
            time: "2 minutes ago",
            read: false,
            category: "project",
            sender: "John Doe",
            avatar: "https://i.pravatar.cc/150?img=1",
        },
        {
            id: 2,
            type: "warning",
            title: "Deadline Reminder",
            message: "Project 'XYZ Tech' deadline is approaching in 3 days. Please review and submit your work.",
            time: "1 hour ago",
            read: false,
            category: "deadline",
            sender: "Jane Smith",
            avatar: "https://i.pravatar.cc/150?img=2",
        },
        {
            id: 3,
            type: "info",
            title: "New Team Member",
            message: "Sarah Johnson has joined your team as a Frontend Developer.",
            time: "3 hours ago",
            read: true,
            category: "team",
            sender: "Team Lead",
            avatar: "https://i.pravatar.cc/150?img=3",
        },
        {
            id: 4,
            type: "success",
            title: "Idea Approved",
            message: "Your idea 'Sustainable Energy Solution' has been approved by the review board.",
            time: "5 hours ago",
            read: true,
            category: "ideation",
            sender: "Review Board",
            avatar: "https://i.pravatar.cc/150?img=4",
        },
        {
            id: 5,
            type: "warning",
            title: "System Maintenance",
            message: "Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM. Some features may be temporarily unavailable.",
            time: "1 day ago",
            read: true,
            category: "system",
            sender: "System Admin",
            avatar: "https://i.pravatar.cc/150?img=5",
        },
        {
            id: 6,
            type: "info",
            title: "New Message",
            message: "You have 3 new messages in the project discussion thread.",
            time: "2 days ago",
            read: true,
            category: "message",
            sender: "Project Team",
            avatar: "https://i.pravatar.cc/150?img=6",
        },
    ])

    const getNotificationIcon = (type) => {
        switch (type) {
            case "success":
                return <CheckCircle className="h-5 w-5 text-green-400" />;
            case "warning":
                return <AlertCircle className="h-5 w-5 text-yellow-400" />;
            case "info":
                return <Info className="h-5 w-5 text-blue-400" />;
            default:
                return <Bell className="h-5 w-5 text-gray-400" />;
        }
    };

    const getNotificationColor = (type) => {
        switch (type) {
            case "success":
                return "border-l-green-500 bg-green-500/5";
            case "warning":
                return "border-l-yellow-500 bg-yellow-500/5";
            case "info":
                return "border-l-blue-500 bg-blue-500/5";
            default:
                return "border-l-gray-500 bg-gray-500/5";
        }
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case "project":
                return <Building2 className="h-4 w-4" />;
            case "deadline":
                return <Clock className="h-4 w-4" />;
            case "team":
                return <User className="h-4 w-4" />;
            case "ideation":
                return <TrendingUp className="h-4 w-4" />;
            case "system":
                return <Settings className="h-4 w-4" />;
            case "message":
                return <MessageSquare className="h-4 w-4" />;
            default:
                return <Bell className="h-4 w-4" />;
        }
    };

    const filteredNotifications = notifications.filter((notification) => {
        // Skip archived notifications
        if (notification.archived) return false;

        const matchesSearch = searchQuery === "" ||
            notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            notification.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
            notification.sender.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = activeTab === "all" ||
            (activeTab === "unread" && !notification.read) ||
            (activeTab === "read" && notification.read);
        const matchesFilter = selectedFilter === "all" || notification.category === selectedFilter;

        return matchesSearch && matchesTab && matchesFilter;
    });

    const unreadCount = notifications.filter(n => !n.read && !n.archived).length;
    const totalCount = notifications.filter(n => !n.archived).length;
    const readCount = notifications.filter(n => n.read && !n.archived).length;

    const handleMarkAsRead = (id) => {
        setNotifications(prev =>
            prev.map(notification =>
                notification.id === id
                    ? { ...notification, read: true }
                    : notification
            )
        );
    };

    const handleDelete = (id) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    };

    const handleArchive = (id) => {
        setNotifications(prev =>
            prev.map(notification =>
                notification.id === id
                    ? { ...notification, archived: true }
                    : notification
            )
        );
    };

    const handleMarkAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notification => ({ ...notification, read: true }))
        );
    };

    const handleArchiveAll = () => {
        setNotifications(prev =>
            prev.map(notification => ({ ...notification, archived: true }))
        );
    };

    const handleClearAll = () => {
        setNotifications([]);
    };

    const handleDismissAll = () => {
        setNotifications(prev =>
            prev.map(notification => ({ ...notification, read: true }))
        );
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
        setNotifications(prev => [newNotification, ...prev]);

        // Play notification sound (optional)
        try {
            // Create a simple notification sound
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);

            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        } catch (error) {
            // Fallback if audio context is not supported
            console.log("Notification sound not supported");
        }
    };

    return (
        <div className="w-full p-4 px-2 space-y-6">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl font-bold">Notifications</h1>
                        {unreadCount > 0 && (
                            <div className="inline-flex items-center gap-1 px-2 py-1 bg-red-500/20 border border-red-500/30 rounded-full">
                                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                <span className="text-xs text-red-400 font-medium">
                                    {unreadCount}
                                </span>
                            </div>
                        )}
                    </div>
                    <p className="text-xs text-gray-400">
                        Stay updated with your projects, team, and system alerts
                    </p>
                    {unreadCount > 0 && (
                        <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full">
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                            <span className="text-xs text-blue-400 font-medium">
                                {unreadCount} new notification{unreadCount !== 1 ? 's' : ''}
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleRefreshNotifications}
                        className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                        title="Refresh notifications"
                    >
                        <Clock className="h-5 w-5" />
                    </button>
                    <button
                        onClick={handleDismissAll}
                        disabled={unreadCount === 0}
                        className="p-2 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors"
                        title="Dismiss all notifications"
                    >
                        <CheckCircle className="h-5 w-5" />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                        <Settings className="h-5 w-5" />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                        <Archive className="h-5 w-5" />
                    </button>
                </div>
            </div>

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
                        {["all", "project", "deadline", "team", "ideation", "system", "message"].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setSelectedFilter(filter)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${selectedFilter === filter
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
            <div className="flex border-b border-white/10">
                {[
                    { key: "all", label: "All", count: totalCount },
                    { key: "unread", label: "Unread", count: unreadCount },
                    { key: "read", label: "Read", count: readCount },
                ].map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-6 py-3 text-sm font-medium transition-all duration-200 relative ${activeTab === tab.key
                            ? "text-white border-b-2 border-blue-500"
                            : "text-gray-400 hover:text-white"
                            }`}
                    >
                        {tab.label}
                        {tab.count > 0 && (
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
                        <BellOff className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-400 mb-2">
                            {searchQuery || selectedFilter !== "all"
                                ? "No notifications found"
                                : "All caught up!"
                            }
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">
                            {searchQuery || selectedFilter !== "all"
                                ? "Try adjusting your search or filters"
                                : "You're all caught up! Check back later for updates."
                            }
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
                            className={`group p-4 rounded-xl border-l-4 transition-all duration-200 hover:bg-white/5 ${getNotificationColor(notification.type)
                                } ${!notification.read ? "bg-white/10" : ""}`}
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    {getNotificationIcon(notification.type)}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between">
                                        {/* Hover Mark as Read Button */}
                                        {!notification.read && (
                                            <button
                                                onClick={() => handleMarkAsRead(notification.id)}
                                                className="absolute left-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-green-500/20 rounded-lg text-green-400 hover:text-green-300"
                                                title="Mark as read"
                                            >
                                                <CheckCircle className="h-4 w-4" />
                                            </button>
                                        )}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-medium text-white">{notification.title}</h3>
                                                <div className="flex items-center gap-1 text-xs text-gray-400">
                                                    {getCategoryIcon(notification.category)}
                                                    <span>{notification.category}</span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-300 mb-2 line-clamp-2">
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
                                            {!notification.read && (
                                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                            )}

                                            {/* Quick Mark as Read Button for Unread Notifications */}
                                            {!notification.read && (
                                                <button
                                                    onClick={() => handleMarkAsRead(notification.id)}
                                                    className="p-1.5 hover:bg-green-500/20 rounded-lg transition-colors text-green-400 hover:text-green-300"
                                                    title="Mark as read"
                                                >
                                                    <CheckCircle className="h-4 w-4" />
                                                </button>
                                            )}

                                            <div className="relative group">
                                                <button className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                                                    <MoreVertical className="h-4 w-4" />
                                                </button>
                                                <div className="absolute right-0 top-full mt-1 w-32 bg-[#1A1A1A] border border-white/20 rounded-lg shadow-lg py-1 z-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                                                    {!notification.read && (
                                                        <button
                                                            onClick={() => handleMarkAsRead(notification.id)}
                                                            className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                                                        >
                                                            Mark as read
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleArchive(notification.id)}
                                                        className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                                                    >
                                                        Archive
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(notification.id)}
                                                        className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
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
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="text-sm text-gray-400">
                        {filteredNotifications.length} of {totalCount} notification{totalCount !== 1 ? 's' : ''} shown
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleMarkAllAsRead}
                            disabled={unreadCount === 0}
                            className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                        >
                            Mark all as read
                        </button>
                        <button
                            onClick={handleArchiveAll}
                            disabled={totalCount === 0}
                            className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                        >
                            Archive all
                        </button>
                        <button
                            onClick={handleClearAll}
                            disabled={totalCount === 0}
                            className="px-4 py-2 text-sm bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                        >
                            Clear all
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notifications; 