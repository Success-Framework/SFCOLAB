import React, { useState, useRef } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, X, Image as ImageIcon, Video, PlusCircle } from 'lucide-react';

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl overflow-hidden">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-semibold text-sm">{post.author.name}</p>
            <p className="text-xs text-gray-400">{post.timestamp}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-full">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post Media */}
      <div>
        {post.type === 'image' ? (
          <img src={post.mediaUrl} alt="Post content" className="w-full object-cover" />
        ) : (
          <video src={post.mediaUrl} controls className="w-full"></video>
        )}
      </div>

      {/* Post Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button onClick={() => setLiked(!liked)}>
              <Heart size={24} className={`transition-colors ${liked ? 'text-red-500 fill-current' : 'hover:text-gray-400'}`} />
            </button>
            <button>
              <MessageCircle size={24} className="hover:text-gray-400" />
            </button>
            <button>
              <Send size={24} className="hover:text-gray-400" />
            </button>
          </div>
          <button onClick={() => setBookmarked(!bookmarked)}>
            <Bookmark size={24} className={`transition-colors ${bookmarked ? 'text-blue-400 fill-current' : 'hover:text-gray-400'}`} />
          </button>
        </div>

        {/* Likes and Caption */}
        <p className="text-sm font-semibold">{post.likes} likes</p>
        <p className="text-sm mt-1">
          <span className="font-semibold">{post.author.name}</span>
          <span className="text-gray-300 ml-2">{post.caption}</span>
        </p>
        <p className="text-xs text-gray-500 mt-2 cursor-pointer hover:underline">View all {post.comments} comments</p>
      </div>

      {/* Add Comment */}
      <div className="border-t border-white/10 px-4 py-2">
        <form className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Add a comment..."
            className="bg-transparent w-full focus:outline-none text-sm"
          />
          <button type="submit" className="text-blue-500 font-semibold text-sm">Post</button>
        </form>
      </div>
    </div>
  );
};

const CreatePostModal = ({ onClose }) => {
    const [caption, setCaption] = useState('');
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(URL.createObjectURL(selectedFile));
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#1A1A1A] border border-white/20 rounded-2xl p-6 w-full max-w-lg relative">
                <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full">
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
                            <p className="text-xs text-gray-500 mt-1">or</p>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 text-sm font-medium">
                                Select from computer
                            </button>
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
                            <img src={file} alt="Preview" className="max-h-full rounded-lg" />
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
                    <button className="w-full bg-blue-600 hover:bg-blue-700 py-2.5 rounded-xl font-medium transition-colors">
                        Share
                    </button>
                </div>
            </div>
        </div>
    );
};

const Posts = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const examplePosts = [
    {
      id: 1,
      author: { name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?img=5' },
      timestamp: '2 hours ago',
      type: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070',
      caption: 'Late night coding session for our new project. The future is bright! 💡 #devlife #startup',
      likes: 128,
      comments: 12,
    },
    {
      id: 2,
      author: { name: 'Mike Chen', avatar: 'https://i.pravatar.cc/150?img=1' },
      timestamp: '5 hours ago',
      type: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974',
      caption: 'Team brainstorming session today. So many great ideas flowing. Excited for what\'s next!',
      likes: 256,
      comments: 23,
    },
    {
      id: 3,
      author: { name: 'Emma Davis', avatar: 'https://i.pravatar.cc/150?img=2' },
      timestamp: '1 day ago',
      type: 'video',
      mediaUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      caption: 'A quick look at our new office space! Loving the vibe here. #office #startupgrind',
      likes: 312,
      comments: 41,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="md:col-span-2 space-y-8">
            {/* Create Post Section */}
            <div className="bg-[#1A1A1A] p-4 rounded-2xl flex items-center gap-4">
                <img src="https://i.pravatar.cc/150?img=7" alt="current user" className="w-10 h-10 rounded-full" />
                <button 
                    onClick={() => setShowCreateModal(true)}
                    className="w-full bg-[#232323] text-left text-gray-400 rounded-full px-4 py-2 hover:bg-[#2a2a2a]"
                >
                    What's on your mind?
                </button>
                <button onClick={() => setShowCreateModal(true)} className="p-2 hover:bg-white/10 rounded-full">
                    <ImageIcon className="text-green-500" />
                </button>
                <button onClick={() => setShowCreateModal(true)} className="p-2 hover:bg-white/10 rounded-full">
                    <Video className="text-red-500" />
                </button>
            </div>

            {examplePosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Sidebar */}
          <div className="hidden md:block space-y-6">
            <div className="bg-[#1A1A1A] p-4 rounded-2xl">
                <h3 className="font-bold mb-4">Suggestions For You</h3>
                <div className="space-y-4">
                    {/* Example Suggested User */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src="https://i.pravatar.cc/150?img=8" alt="suggested user" className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-semibold text-sm">alex_wong</p>
                                <p className="text-xs text-gray-400">Suggested for you</p>
                            </div>
                        </div>
                        <button className="text-blue-500 text-xs font-bold">Follow</button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src="https://i.pravatar.cc/150?img=9" alt="suggested user" className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-semibold text-sm">tech_innovators</p>
                                <p className="text-xs text-gray-400">Popular</p>
                            </div>
                        </div>
                        <button className="text-blue-500 text-xs font-bold">Follow</button>
                    </div>
                </div>
            </div>
            <div className="text-xs text-gray-600">
                <p>&copy; {new Date().getFullYear()} SFCOLAB. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>

      {showCreateModal && <CreatePostModal onClose={() => setShowCreateModal(false)} />}
    </div>
  );
};

export default Posts;
