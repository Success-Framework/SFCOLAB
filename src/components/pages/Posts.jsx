"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  X,
  Image as ImageIcon,
  Video,
} from "lucide-react";

const PostCard = ({ post, refreshPost }) => {
  const token = localStorage.getItem("authToken");

  const [liked, setLiked] = useState(post.isLiked || false);
  const [likes, setLikes] = useState(post.likes || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState("");
  const [mediaPreview, setMediaPreview] = useState("");

  // Considering data coming from the database would be a blob
  useEffect(() => {
    if (post.media && post.media.length > 0) {
      const mediaItem = post.media[0];

      let blob;
      if (mediaItem.data instanceof Uint8Array) {
        blob = new Blob([mediaItem.data], { type: mediaItem.contentType });
      } else if (typeof mediaItem.data === "string") {
        // base64 string
        const byteCharacters = atob(mediaItem.data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        blob = new Blob([byteArray], { type: mediaItem.contentType });
      }
      if (blob) {
        const url = URL.createObjectURL(blob);
        setMediaPreview(url);
        return () => URL.revokeObjectURL(url);
      }
    }
  }, [post]);

  // Like/unlike
  const handleLike = async () => {
    try {
      const res = await fetch(
        `https://sfcolab-backend.onrender.com/api/profile/posts/${post._id}/like`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setLiked(data.liked);
      setLikes(data.likes);
      if (refreshPost) refreshPost(post._id);
    } catch (error) {
      console.error("Like/unlike error:", error);
    }
  };

  // Add comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const res = await fetch(
        `https://sfcolab-backend.onrender.com/api/profile/posts/${post._id}/comments`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: commentText }),
        }
      );
      const data = await res.json();
      setComments([data.comment, ...comments]);
      setCommentText("");
    } catch (error) {
      console.error("Add comment error:", error);
    }
  };

  return (
    <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl overflow-hidden">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img
            src={post.author.avatar || `https://i.pravatar.cc/150?img=5`}
            alt={post.author.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-sm">{post.author.firstName}</p>
            <p className="text-xs text-gray-400">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-full">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post Media */}
      {mediaPreview && (
        <div>
          {post.type === "video" ? (
            <video src={mediaPreview} controls className="w-full" />
          ) : (
            <img src={mediaPreview} alt="Post content" className="w-full object-cover" />
          )}
        </div>
      )}

      {/* Post Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button onClick={handleLike}>
              <Heart
                size={24}
                className={`transition-colors ${
                  liked ? "text-red-500 fill-current" : "hover:text-gray-400"
                }`}
              />
            </button>
            <button>
              <MessageCircle size={24} className="hover:text-gray-400" />
            </button>
            <button>
              <Send size={24} className="hover:text-gray-400" />
            </button>
          </div>
          <button>
            <Bookmark size={24} className="hover:text-gray-400" />
          </button>
        </div>

        <p className="text-sm font-semibold">{likes} likes</p>
        <p className="text-sm mt-1">
          <span className="font-semibold">{post.author.firstName}</span>
          <span className="text-gray-300 ml-2">{post.content}</span>
        </p>
        <p className="text-xs text-gray-500 mt-2 cursor-pointer hover:underline">
          View all {comments.length} comments
        </p>
      </div>

      {/* Add Comment */}
      <div className="border-t border-white/10 px-4 py-2">
        <form className="flex items-center gap-2" onSubmit={handleAddComment}>
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="bg-transparent w-full focus:outline-none text-sm"
          />
          <button type="submit" className="text-blue-500 font-semibold text-sm">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

const CreatePostModal = ({ onClose, onPostCreated }) => {
  const token = localStorage.getItem("authToken");
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [type, setType] = useState("image");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setType(selectedFile.type.includes("video") ? "video" : "image");
  };

  const handleSubmit = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("media", file);
    formData.append("content", caption);
    formData.append("type", type);

    try {
      const res = await fetch(
        "https://sfcolab-backend.onrender.com/api/profile/posts",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );
      const data = await res.json();
      if (onPostCreated) onPostCreated(data.post);
      onClose();
    } catch (error) {
      console.error("Create post error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1A1A1A] border border-white/20 rounded-2xl p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full"
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold text-center mb-4">Create New Post</h2>
        <div className="border-t border-b border-white/10 py-4">
          {!file ? (
            <div
              className="bg-[#232323] h-64 flex flex-col items-center justify-center rounded-xl cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              <ImageIcon size={48} className="text-gray-500 mb-2" />
              <p className="text-gray-400">Drag photos and videos here</p>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*,video/*"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center">
              {type === "image" ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="max-h-full rounded-lg"
                />
              ) : (
                <video
                  src={URL.createObjectURL(file)}
                  controls
                  className="max-h-full rounded-lg"
                />
              )}
            </div>
          )}
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption..."
            className="w-full bg-[#232323] rounded-xl p-4 mt-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 py-2.5 rounded-xl font-medium transition-colors"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

const Posts = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken"); 

  const fetchFeed = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://sfcolab-backend.onrender.com/api/profile/feed",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      const onlyPosts = data.feed.filter((item) => item.contentType === "post");
      setPosts(onlyPosts);
    } catch (error) {
      console.error("Fetch feed error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="md:col-span-2 space-y-8">
            {/* Create Post Section */}
            <div className="bg-[#1A1A1A] p-4 rounded-2xl flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/150?img=7"
                alt="current user"
                className="w-10 h-10 rounded-full"
              />
              <button
                onClick={() => setShowCreateModal(true)}
                className="w-full bg-[#232323] text-left text-gray-400 rounded-full px-4 py-2 hover:bg-[#2a2a2a]"
              >
                What's on your mind?
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="p-2 hover:bg-white/10 rounded-full"
              >
                <ImageIcon className="text-green-500" />
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="p-2 hover:bg-white/10 rounded-full"
              >
                <Video className="text-red-500" />
              </button>
            </div>

            {loading ? (
              <p className="text-center text-gray-400">Loading feed...</p>
            ) : (
              posts.map((post) => (
                <PostCard key={post._id} post={post} refreshPost={fetchFeed} />
              ))
            )}
          </div>

          {/* Sidebar */}
          <div className="hidden md:block space-y-6">
            <div className="bg-[#1A1A1A] p-4 rounded-2xl">
              <h3 className="font-bold mb-4">Suggestions For You</h3>
              <div className="space-y-4">
                {/* Example Suggested User */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://i.pravatar.cc/150?img=8"
                      alt="suggested user"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-sm">alex_wong</p>
                      <p className="text-xs text-gray-400">Suggested for you</p>
                    </div>
                  </div>
                  <button className="text-blue-500 text-xs font-bold">
                    Follow
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://i.pravatar.cc/150?img=9"
                      alt="suggested user"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-sm">tech_innovators</p>
                      <p className="text-xs text-gray-400">Popular</p>
                    </div>
                  </div>
                  <button className="text-blue-500 text-xs font-bold">
                    Follow
                  </button>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-600">
              <p>
                &copy; {new Date().getFullYear()} SFCOLAB. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      {showCreateModal && (
        <CreatePostModal
          onClose={() => setShowCreateModal(false)}
          onPostCreated={fetchFeed}
        />
      )}
    </div>
  );
};

export default Posts;
