import { useState } from 'react';
import { Home, Settings, Volume2, VolumeX, MessageCircle, User } from 'lucide-react';
import { FeatureCard } from './FeatureCard';
import { SupportCard } from './SupportCard';
import { FeedPage } from './FeedPage';
import { SettingsPage } from './SettingsPage';
import { VaultPage } from './VaultPage';
import { GuidesPage } from './GuidesPage';
import { SafetyPage } from './SafetyPage';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [isSilentMode, setIsSilentMode] = useState(false);
  const [activePage, setActivePage] = useState<'home' | 'vault' | 'guides' | 'safety'>('home');

  const renderBottomNav = () => (
    <div className="bg-white/80 backdrop-blur-xl border-t border-gray-200 px-8 py-5 shadow-lg">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <button 
          onClick={() => {
            setActiveTab('home');
            setActivePage('home');
          }}
          className={`flex flex-col items-center gap-1.5 transition-all ${
            activeTab === 'home' 
              ? 'text-purple-600 scale-110' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <div className={`rounded-2xl p-2 ${activeTab === 'home' ? 'bg-purple-100' : ''}`}>
            <Home size={26} strokeWidth={2.5} />
          </div>
          <span className="text-xs">Home</span>
        </button>
        <button 
          onClick={() => setActiveTab('chats')}
          className={`flex flex-col items-center gap-1.5 transition-all ${
            activeTab === 'chats' 
              ? 'text-purple-600 scale-110' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <div className={`rounded-2xl p-2 ${activeTab === 'chats' ? 'bg-purple-100' : ''}`}>
            <MessageCircle size={26} strokeWidth={2.5} />
          </div>
          <span className="text-xs">Chats</span>
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`flex flex-col items-center gap-1.5 transition-all ${
            activeTab === 'settings' 
              ? 'text-purple-600 scale-110' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <div className={`rounded-2xl p-2 ${activeTab === 'settings' ? 'bg-purple-100' : ''}`}>
            <Settings size={26} strokeWidth={2.5} />
          </div>
          <span className="text-xs">Settings</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-purple-50 flex items-center justify-center p-4">
      {/* Mobile Container */}
      <div className="w-full max-w-[420px] h-[844px] bg-white shadow-2xl overflow-hidden relative flex flex-col" style={{ borderRadius: '60px' }}>

        {/* Page Content */}
        {activeTab === 'home' && activePage === 'home' && (
          <div className="flex-1 overflow-y-auto px-6 pb-24">
            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-8 mt-8">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white shadow-lg shadow-purple-200">
                <User size={36} strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-gray-900">Welcome, Vuyiswa</h1>
                <p className="text-gray-500 text-sm">You're protected and safe</p>
              </div>
            </div>

            {/* Circular Silent/Active Mode Button */}
            <div className="flex items-center justify-center mb-8">
              <button 
                onClick={() => setIsSilentMode(!isSilentMode)}
                className={`relative w-48 h-48 rounded-full cursor-pointer transition-all duration-500 shadow-2xl ${
                  isSilentMode 
                    ? 'bg-gradient-to-br from-slate-500 via-indigo-500 to-purple-600 shadow-purple-300' 
                    : 'bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 shadow-green-300 animate-pulse'
                }`}
                style={{
                  boxShadow: isSilentMode 
                    ? '0 20px 60px rgba(139, 92, 246, 0.4)' 
                    : '0 20px 60px rgba(16, 185, 129, 0.5)'
                }}
              >
                <div className="flex flex-col items-center justify-center text-white h-full">
                  {isSilentMode ? (
                    <VolumeX size={56} strokeWidth={2} className="mb-3" />
                  ) : (
                    <Volume2 size={56} strokeWidth={2} className="mb-3" />
                  )}
                  <p className="text-2xl mb-1">{isSilentMode ? 'Silent' : 'Active'}</p>
                  <p className="text-xs px-6 text-center opacity-90">
                    {isSilentMode ? 'Tap to activate' : 'Recording & alerting'}
                  </p>
                </div>
                {!isSilentMode && (
                  <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping"></div>
                )}
              </button>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div onClick={() => setActivePage('vault')} className="cursor-pointer">
                <FeatureCard 
                  title="Vault" 
                  icon="🔒"
                  subtitle="Secure storage"
                />
              </div>
              <div onClick={() => setActivePage('guides')} className="cursor-pointer">
                <FeatureCard 
                  title="Guides" 
                  icon="📖"
                  subtitle="Safety tips"
                />
              </div>
              <div onClick={() => setActivePage('safety')} className="cursor-pointer">
                <FeatureCard 
                  title="Safety" 
                  icon="🛡️"
                  subtitle="Quick help"
                />
              </div>
            </div>

            {/* Support Resources */}
            <SupportCard />
          </div>
        )}

        {activeTab === 'chats' && (
          <div className="flex-1 overflow-hidden">
            <FeedPage onBack={() => setActiveTab('home')} />
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="flex-1 overflow-hidden">
            <SettingsPage onBack={() => setActiveTab('home')} />
          </div>
        )}

        {activeTab === 'home' && activePage === 'vault' && (
          <div className="flex-1 overflow-hidden">
            <VaultPage onBack={() => setActivePage('home')} />
          </div>
        )}

        {activeTab === 'home' && activePage === 'guides' && (
          <div className="flex-1 overflow-hidden">
            <GuidesPage onBack={() => setActivePage('home')} />
          </div>
        )}

        {activeTab === 'home' && activePage === 'safety' && (
          <div className="flex-1 overflow-hidden">
            <SafetyPage onBack={() => setActivePage('home')} />
          </div>
        )}

        {/* Bottom Navigation - Always visible */}
        {renderBottomNav()}
      </div>
    </div>
  );
}
