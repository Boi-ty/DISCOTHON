import { useState } from 'react';
import { ArrowLeft, Lock, Image, Video, Mic, Folder, Eye, EyeOff, Trash2, Download } from 'lucide-react';

interface VaultItem {
  id: string;
  type: 'image' | 'video' | 'audio';
  name: string;
  date: string;
  size: string;
  thumbnail?: string;
}

interface VaultPageProps {
  onBack: () => void;
}

export function VaultPage({ onBack }: VaultPageProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'all' | 'images' | 'videos' | 'audio'>('all');

  const [vaultItems] = useState<VaultItem[]>([
    {
      id: '1',
      type: 'audio',
      name: 'Recording_2024_11_14_15_30.mp3',
      date: 'Nov 14, 2024 3:30 PM',
      size: '2.3 MB'
    },
    {
      id: '2',
      type: 'image',
      name: 'Evidence_IMG_001.jpg',
      date: 'Nov 13, 2024 10:15 AM',
      size: '1.8 MB'
    },
    {
      id: '3',
      type: 'video',
      name: 'Video_Evidence_001.mp4',
      date: 'Nov 12, 2024 8:20 PM',
      size: '15.2 MB'
    }
  ]);

  const handleUnlock = () => {
    // In a real app, this would verify against a secure hash
    if (password.length >= 4) {
      setIsUnlocked(true);
    }
  };

  const filteredItems = vaultItems.filter(item => 
    selectedTab === 'all' ? true : 
    selectedTab === 'images' ? item.type === 'image' :
    selectedTab === 'videos' ? item.type === 'video' :
    item.type === 'audio'
  );

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image size={20} className="text-purple-600" />;
      case 'video': return <Video size={20} className="text-purple-600" />;
      case 'audio': return <Mic size={20} className="text-purple-600" />;
      default: return <Folder size={20} className="text-purple-600" />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-6 flex items-center gap-4 shadow-lg">
        <button onClick={onBack} className="text-white hover:text-purple-100">
          <ArrowLeft size={24} />
        </button>
        <Lock size={22} className="text-white" />
        <h1 className="text-white text-xl">Secure Vault</h1>
      </div>

      {!isUnlocked ? (
        /* Lock Screen */
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="w-full max-w-sm">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Lock size={48} className="text-white" />
            </div>
            <h2 className="text-gray-800 text-center mb-2">Enter Vault Password</h2>
            <p className="text-gray-500 text-sm text-center mb-6">
              Your evidence is stored securely and encrypted
            </p>
            
            <div className="relative mb-4">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-white border border-gray-300 rounded-2xl px-4 py-4 pr-12 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              onClick={handleUnlock}
              className="w-full bg-purple-600 text-white py-4 rounded-2xl hover:bg-purple-700 transition-colors"
            >
              Unlock Vault
            </button>

            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <p className="text-amber-800 text-xs text-center">
                🔒 All files are encrypted and password protected. Only you can access this vault.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Vault Content */
        <div className="flex-1 flex flex-col">
          {/* Info Banner */}
          <div className="bg-green-50 border-b border-green-200 px-6 py-3">
            <p className="text-green-800 text-sm">
              🎙️ Voice recording is active when Alert mode is on • Evidence is automatically saved here
            </p>
          </div>

          {/* Tabs */}
          <div className="bg-white border-b border-gray-200 px-6 py-3">
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedTab('all')}
                className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                  selectedTab === 'all' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedTab('images')}
                className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                  selectedTab === 'images' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Images
              </button>
              <button
                onClick={() => setSelectedTab('videos')}
                className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                  selectedTab === 'videos' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Videos
              </button>
              <button
                onClick={() => setSelectedTab('audio')}
                className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                  selectedTab === 'audio' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Audio
              </button>
            </div>
          </div>

          {/* Files List */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <div className="space-y-3">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-2xl p-4 hover:border-purple-300 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      {getItemIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 text-sm truncate">{item.name}</p>
                      <p className="text-gray-500 text-xs mt-1">{item.date}</p>
                      <p className="text-gray-400 text-xs">{item.size}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-purple-600 hover:text-purple-700">
                        <Download size={18} />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <Folder size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-sm">No {selectedTab === 'all' ? 'files' : selectedTab} yet</p>
                <p className="text-gray-400 text-xs mt-2">Evidence will be saved here automatically</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
