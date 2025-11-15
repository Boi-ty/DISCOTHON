import { useState } from 'react';
import { Heart, MessageCircle, Share2, Send } from 'lucide-react';

interface Post {
  id: string;
  username: string;
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
  liked: boolean;
}

interface FeedPageProps {
  onBack: () => void;
}

export function FeedPage({ onBack }: FeedPageProps) {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      username: 'Shamper@',
      content: 'Hi, I was abused by my bf of 2 years. I don\'t know how to deal with it',
      likes: 23,
      comments: 5,
      timestamp: '2h ago',
      liked: false
    },
    {
      id: '2',
      username: 'Stranger@93',
      content: 'Hi, I was at a petrotah at Rand east there is a guy there trying to kiss woman like drive this car',
      likes: 156,
      comments: 12,
      timestamp: '4h ago',
      liked: false
    }
  ]);

  const [newPost, setNewPost] = useState('');

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handlePost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        username: `Anonymous@${Math.floor(Math.random() * 100)}`,
        content: newPost,
        likes: 0,
        comments: 0,
        timestamp: 'Just now',
        liked: false
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-6 shadow-lg">
        <h1 className="text-white text-xl">Anonymous Community</h1>
        <p className="text-purple-100 text-xs mt-1">Share your story safely</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {/* Post Input */}
        <div className="p-6 bg-white border-b border-gray-100 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-md">
              <span className="text-sm">?</span>
            </div>
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share your experience anonymously..."
                className="w-full bg-purple-50/50 border border-purple-100 rounded-2xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                rows={3}
              />
              <button 
                onClick={handlePost}
                className="mt-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-full text-sm hover:shadow-lg transition-all flex items-center gap-2 shadow-md"
              >
                <Send size={16} />
                Share Anonymously
              </button>
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-3 p-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-3xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-all">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                  <span className="text-sm">?</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-900 text-sm">{post.username}</span>
                    <span className="text-gray-400 text-xs">• {post.timestamp}</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">{post.content}</p>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-6 pt-2 border-t border-gray-100">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-2 text-sm transition-colors py-2 ${
                        post.liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                      }`}
                    >
                      <Heart size={18} fill={post.liked ? 'currentColor' : 'none'} strokeWidth={2} />
                      <span className="font-medium">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-purple-600 transition-colors py-2">
                      <MessageCircle size={18} strokeWidth={2} />
                      <span className="font-medium">{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-purple-600 transition-colors py-2">
                      <Share2 size={18} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 border-t border-purple-200 px-6 py-4">
        <p className="text-purple-900 text-xs text-center font-medium">
          🔒 100% Anonymous • 💬 Share safely • 🗺️ Alert others
        </p>
      </div>
    </div>
  );
}
