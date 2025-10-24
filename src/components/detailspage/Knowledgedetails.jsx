import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Share2,
  Bookmark,
  FileText,
  Calendar,
  User,
  Tag,
  Download,
  Eye,
  ThumbsUp,
  MessageSquare,
  Send,
  Image as ImageIcon,
  Link as LinkIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const KnowledgeDetails = () => {
  const [knowledgeDetails, setKnowledgeDetails] = useState(null);
  const [comment, setComment] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const getfileUrlColor = (type) => {
    const colors = {
      PDF: "bg-red-600",
      DOC: "bg-blue-600",
      XLS: "bg-green-600",
      PPT: "bg-yellow-600",
      TXT: "bg-gray-600",
      PNG: "bg-pink-600",
      JPG: "bg-orange-600",
      JPEG: "bg-orange-600",
    };
    return colors[type] || "bg-gray-600";
  };
  // Fetch comments for the resource
  const fetchComments = async () => {
    if (!id) return;

    setCommentsLoading(true);
    try {
      const response = await fetch(
        `https://sfcolab-backend.onrender.com/api/knowledge/${id}/comments`
      );
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments || []);
      } else {
        console.warn("Comments API response not OK:", response.status);
        setComments([]);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]);
    } finally {
      setCommentsLoading(false);
    }
  };

  // Submit a new comment
  const submitComment = async () => {
    if (!comment.trim() || !id) return;

    setCommentSubmitting(true);
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `https://sfcolab-backend.onrender.com/api/knowledge/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({ content: comment.trim() }),
        }
      );

      if (response.ok) {
        await fetchComments(); 
        setComment("");
      } else {
        console.warn("Comment submission failed:", response.status);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Failed to submit comment. Please try again.");
    } finally {
      setCommentSubmitting(false);
    }
  };

  // Fetch resource details
  const fetchKnowledgeDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://sfcolab-backend.onrender.com/api/knowledge/${id}`
      );
      if (response.ok) {
        const { resource: data } = await response.json();
        if (data) {
          const resourceData = {
            id: data._id || id,
            title: data.title || "Untitled Resource",
            titleDescription:
              data.titleDescription || "No title description available.",
            contentPreview:
              data.contentPreview || "No content preview available.",
            category: data.category || "Uncategorized",
            author: {
              name: data.author
                ? `${data.author.firstName || ""} ${
                    data.author.lastName || ""
                  }`.trim() || "Unknown Author"
                : "Unknown Author",
              role: data.author?.role || "Contributor",
              avatar:
                data.author?.avatar || `https://i.pravatar.cc/150?img=${id}`,
            },
            date: data.createdAt
              ? new Date(data.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              : "Unknown Date",
            fileUrl: data.fileUrl
              ? data.fileUrl.split(".").pop().toUpperCase()
              : "UNKNOWN",
            views: data.views?.toString() || "0",
            downloads: data.downloads || 0,
            likes: data.likes || 0,
            comments: data.comments?.length || 0,
            tags: data.tags || [],
            relatedResources:
              data.relatedResources?.map((res) => ({
                id: res.id,
                title: res.title || "Untitled",
                category: res.category || "Uncategorized",
                fileUrl: res.fileUrl
                  ? res.fileUrl.split(".").pop().toUpperCase()
                  : "UNKNOWN",
                views: res.views?.toString() || "0",
              })) || [],
          };

          setKnowledgeDetails(resourceData);
          console.log("API data fetched:", resourceData);
        } else {
          throw new Error("No resource data returned.");
        }
      } else {
        throw new Error(`API responded with status ${response.status}`);
      }
    } catch (err) {
      console.error("Error in fetchKnowledgeDetails:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchKnowledgeDetails();
      fetchComments();
    } else {
      setError("No resource ID provided.");
      setLoading(false);
    }
  }, [id]);

  const handleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  const handleShare = async () => {
    try {
      const url = `${window.location.origin}/knowledge-details?id=${
        knowledgeDetails?.id || id
      }`;
      if (navigator.share) {
        await navigator.share({
          title: knowledgeDetails?.title || "Knowledge Resource",
          url: url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      }
    } catch (e) {
      console.error("Share failed:", e);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    submitComment();
  };

  const formatCommentTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCommentDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <p className="text-gray-300">Loading knowledge resource...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!knowledgeDetails) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <p className="text-gray-300">No resource found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link
              to="/knowledge"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Resources</span>
            </Link>
            <div className="flex items-center gap-4">
              <button
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                onClick={handleShare}
                aria-label="Share"
              >
                <Share2 className="h-5 w-5" />
              </button>
              <button
                className={`p-2 rounded-lg transition-colors ${
                  isBookmarked
                    ? "bg-blue-500/10 text-blue-400"
                    : "hover:bg-white/10"
                }`}
                onClick={handleBookmark}
                aria-label="Bookmark"
              >
                <Bookmark
                  className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#1A1A1A] rounded-4xl p-8">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-3xl font-bold">{knowledgeDetails.title}</h1>
                <button
                  className={`${getfileUrlColor(
                    knowledgeDetails.fileUrl
                  )} text-sm px-3 py-1 font-medium rounded-sm`}
                >
                  {knowledgeDetails.fileUrl}
                </button>
              </div>
              <h2 className="text-xl font-semibold mb-2">Title Description</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {knowledgeDetails.titleDescription}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {knowledgeDetails.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-[#2A2A2A] text-sm px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-gray-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Eye className="h-5 w-5" />
                    {knowledgeDetails.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Download className="h-5 w-5" />
                    {knowledgeDetails.downloads}
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="h-5 w-5" />
                    {knowledgeDetails.likes}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{knowledgeDetails.date}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1A1A] rounded-4xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Content Preview</h2>
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-gray-300">
                  {knowledgeDetails.contentPreview}
                </pre>
              </div>
              <div className="mt-6 flex justify-center">
                <button className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Download Full Resource
                </button>
              </div>
            </div>

            <div className="bg-[#1A1A1A] rounded-4xl p-8">
              <h2 className="text-2xl font-semibold mb-6">
                Comments & Feedback
              </h2>
              <div className="space-y-6">
                {commentsLoading ? (
                  <p className="text-gray-400">Loading comments...</p>
                ) : comments.length > 0 ? (
                  comments.map((commentItem) => (
                    <div key={commentItem.id} className="flex gap-4">
                      <img
                        src={`https://i.pravatar.cc/150?u=${commentItem.author.id}`}
                        alt={commentItem.author.firstName}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">
                            {commentItem.author.firstName}{" "}
                            {commentItem.author.lastName}
                          </h3>
                          <span className="text-sm text-gray-400">
                            {formatCommentDate(commentItem.createdAt)} at{" "}
                            {formatCommentTime(commentItem.createdAt)}
                          </span>
                        </div>
                        <p className="text-gray-300 mb-2">
                          {commentItem.content}
                        </p>
                        <div className="flex items-center gap-4 text-gray-400">
                          <button className="flex items-center gap-1 hover:text-white transition-colors">
                            <ThumbsUp className="h-4 w-4" />
                            <span>0</span>
                          </button>
                          <button className="hover:text-white transition-colors">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">
                    No comments yet. Be the first to comment!
                  </p>
                )}
              </div>

              <div className="mt-8">
                <form onSubmit={handleCommentSubmit}>
                  <div className="flex gap-4">
                    <img
                      src={knowledgeDetails.author.avatar}
                      alt={knowledgeDetails.author.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add your comment..."
                        className="w-full bg-[#2A2A2A] rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="3"
                        disabled={commentSubmitting}
                      />
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            disabled={commentSubmitting}
                          >
                            <ImageIcon className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            disabled={commentSubmitting}
                          >
                            <LinkIcon className="h-5 w-5" />
                          </button>
                        </div>
                        <button
                          type="submit"
                          className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={!comment.trim() || commentSubmitting}
                        >
                          {commentSubmitting ? "Posting..." : "Post Comment"}
                          <Send className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-[#1A1A1A] rounded-4xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Author</h2>
              <div className="flex items-center gap-4">
                <img
                  src={knowledgeDetails.author.avatar}
                  alt={knowledgeDetails.author.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="font-medium text-lg">
                    {knowledgeDetails.author.name}
                  </h3>
                  <p className="text-gray-400">
                    {knowledgeDetails.author.role}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1A1A] rounded-4xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Related Resources</h2>
              <div className="space-y-4">
                {knowledgeDetails.relatedResources.length > 0 ? (
                  knowledgeDetails.relatedResources.map((resource) => (
                    <Link
                      key={resource.id}
                      to={`/knowledge-details?id=${resource.id}`}
                      className="block p-4 bg-[#2A2A2A] rounded-xl hover:bg-[#333333] transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{resource.title}</h3>
                        <span className="text-sm text-gray-400">
                          {resource.fileUrl}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>{resource.category}</span>
                        <span>{resource.views} views</span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-400">
                    No related resources available.
                  </p>
                )}
              </div>
            </div>

            <div className="bg-[#1A1A1A] rounded-4xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Quick Info</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Category</span>
                  <span>{knowledgeDetails.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">File Type</span>
                  <span>{knowledgeDetails.fileUrl}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Added</span>
                  <span>{knowledgeDetails.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Downloads</span>
                  <span>{knowledgeDetails.downloads}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeDetails;
