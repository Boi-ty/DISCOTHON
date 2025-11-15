import { useState } from 'react';
import { ArrowLeft, BookOpen, Trophy, CheckCircle, Lock, Star, Award } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  locked: boolean;
  points: number;
  icon: string;
}

interface GuidesPageProps {
  onBack: () => void;
}

export function GuidesPage({ onBack }: GuidesPageProps) {
  const [totalPoints, setTotalPoints] = useState(150);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const [modules] = useState<Module[]>([
    {
      id: '1',
      title: 'Understanding GBV',
      description: 'Learn what constitutes gender-based violence and recognize the signs',
      completed: true,
      locked: false,
      points: 50,
      icon: '📚'
    },
    {
      id: '2',
      title: 'Creating Evidence',
      description: 'How to document and preserve evidence safely',
      completed: true,
      locked: false,
      points: 50,
      icon: '📸'
    },
    {
      id: '3',
      title: 'Immediate Response',
      description: 'What to do immediately after an assault',
      completed: true,
      locked: false,
      points: 50,
      icon: '🆘'
    },
    {
      id: '4',
      title: 'Medical Care',
      description: 'Where to go for medical attention and what to expect',
      completed: false,
      locked: false,
      points: 75,
      icon: '🏥'
    },
    {
      id: '5',
      title: 'Legal Rights',
      description: 'Understanding your legal rights and protection orders',
      completed: false,
      locked: false,
      points: 75,
      icon: '⚖️'
    },
    {
      id: '6',
      title: 'Speaking Out',
      description: 'Why silence is dangerous and how to seek help',
      completed: false,
      locked: false,
      points: 100,
      icon: '📢'
    },
    {
      id: '7',
      title: 'Support Networks',
      description: 'Building a safety network and finding support',
      completed: false,
      locked: false,
      points: 100,
      icon: '🤝'
    },
    {
      id: '8',
      title: 'Safety Planning',
      description: 'Creating an emergency safety plan',
      completed: false,
      locked: true,
      points: 150,
      icon: '🛡️'
    }
  ]);

  const completedModules = modules.filter(m => m.completed).length;

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-6 flex items-center gap-4 shadow-lg">
        <button onClick={onBack} className="text-white hover:text-purple-100">
          <ArrowLeft size={24} />
        </button>
        <BookOpen size={22} className="text-white" />
        <h1 className="text-white text-xl">Safety Guides</h1>
      </div>

      {/* Progress Banner */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-6 text-white">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm opacity-90">Your Progress</p>
            <h2 className="text-2xl">{completedModules}/{modules.length} Modules</h2>
          </div>
          <div className="flex items-center gap-2">
            <Trophy size={24} />
            <span className="text-2xl">{totalPoints}</span>
          </div>
        </div>
        <div className="bg-white/30 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-white h-full transition-all duration-500"
            style={{ width: `${(completedModules / modules.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Info Card */}
      <div className="px-6 pt-4">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <p className="text-amber-800 text-sm">
            💡 Learn at your own pace. Each module gives you practical knowledge to stay safe and protect yourself.
          </p>
        </div>
      </div>

      {/* Modules List */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="space-y-3">
          {modules.map((module) => (
            <div
              key={module.id}
              className={`bg-white border rounded-2xl p-4 transition-all ${
                module.locked 
                  ? 'border-gray-200 opacity-60' 
                  : 'border-gray-200 hover:border-purple-300 cursor-pointer hover:shadow-md'
              }`}
              onClick={() => !module.locked && setSelectedModule(module.id)}
            >
              <div className="flex items-start gap-4">
                <div className={`text-3xl flex-shrink-0 ${module.locked ? 'grayscale' : ''}`}>
                  {module.locked ? '🔒' : module.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-gray-800">{module.title}</h3>
                    {module.completed && (
                      <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{module.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-purple-600 text-sm">
                      <Star size={16} />
                      <span>{module.points} points</span>
                    </div>
                    {module.locked ? (
                      <span className="text-xs text-gray-400">Complete previous modules</span>
                    ) : module.completed ? (
                      <span className="text-xs text-green-600">Completed ✓</span>
                    ) : (
                      <button className="text-xs text-purple-600 hover:text-purple-700">
                        Start Module →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Achievement Section */}
        <div className="mt-6 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Award size={24} className="text-purple-600" />
            <h3 className="text-gray-800">Your Achievements</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-xl p-3 text-center">
              <div className="text-2xl mb-1">🏆</div>
              <p className="text-xs text-gray-600">First Steps</p>
            </div>
            <div className="bg-white rounded-xl p-3 text-center">
              <div className="text-2xl mb-1">⭐</div>
              <p className="text-xs text-gray-600">Knowledge</p>
            </div>
            <div className="bg-white rounded-xl p-3 text-center opacity-40">
              <div className="text-2xl mb-1">🎖️</div>
              <p className="text-xs text-gray-600">Master</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
