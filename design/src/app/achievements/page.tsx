'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import { statsApi } from '@/lib/api';
import BottomNav from '@/components/BottomNav';
import withAuth from '@/components/withAuth';
import { ArrowLeft, Trophy, Lock } from 'lucide-react';

interface UserStats {
  stories_published: number;
  stories_read: number;
  reactions_given: number;
  bookmarks: number;
  total_reads: number;
  total_loves: number;
  reading_streak: number;
  member_since: string;
}

function AchievementsPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Alla');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userStats = await statsApi.getUserStats();
        setStats(userStats);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const getAchievements = () => {
    if (!stats) return [];

    return [
      {
        id: 'first_story',
        emoji: '📚',
        title: 'Första Berättelsen',
        description: 'Läs din första berättelse',
        unlocked: stats.stories_read >= 1,
        progress: Math.min(100, stats.stories_read * 100),
        category: 'Läsare'
      },
      {
        id: 'bookworm',
        emoji: '🐛',
        title: 'Bokmal',
        description: 'Läs 10 berättelser',
        unlocked: stats.stories_read >= 10,
        progress: Math.min(100, (stats.stories_read / 10) * 100),
        category: 'Läsare'
      },
      {
        id: 'published',
        emoji: '✍️',
        title: 'Författare',
        description: 'Publicera din första berättelse',
        unlocked: stats.stories_published >= 1,
        progress: Math.min(100, stats.stories_published * 100),
        category: 'Författare'
      },
      {
        id: 'ten_stories',
        emoji: '🏆',
        title: '10 Berättelser',
        description: 'Publicera 10 berättelser',
        unlocked: stats.stories_published >= 10,
        progress: Math.min(100, (stats.stories_published / 10) * 100),
        category: 'Författare'
      },
      {
        id: 'hundred_reads',
        emoji: '💯',
        title: '100 Läsningar',
        description: 'Få 100 läsningar på dina berättelser',
        unlocked: stats.total_reads >= 100,
        progress: Math.min(100, (stats.total_reads / 100) * 100),
        category: 'Popularitet'
      },
      {
        id: 'thousand_reads',
        emoji: '🌟',
        title: '1000 Läsningar',
        description: 'Få 1000 läsningar på dina berättelser',
        unlocked: stats.total_reads >= 1000,
        progress: Math.min(100, (stats.total_reads / 1000) * 100),
        category: 'Popularitet'
      },
      {
        id: 'loved',
        emoji: '❤️',
        title: 'Älskad',
        description: 'Få 50 hjärtan på dina berättelser',
        unlocked: stats.total_loves >= 50,
        progress: Math.min(100, (stats.total_loves / 50) * 100),
        category: 'Popularitet'
      },
      {
        id: 'week_streak',
        emoji: '🔥',
        title: '7-dagars Streak',
        description: 'Läs 7 dagar i rad',
        unlocked: stats.reading_streak >= 7,
        progress: Math.min(100, (stats.reading_streak / 7) * 100),
        category: 'Engagemang'
      },
      {
        id: 'month_streak',
        emoji: '⭐',
        title: '30-dagars Streak',
        description: 'Läs 30 dagar i rad',
        unlocked: stats.reading_streak >= 30,
        progress: Math.min(100, (stats.reading_streak / 30) * 100),
        category: 'Engagemang'
      },
      {
        id: 'curator',
        emoji: '🔖',
        title: 'Kurator',
        description: 'Spara 20 berättelser',
        unlocked: stats.bookmarks >= 20,
        progress: Math.min(100, (stats.bookmarks / 20) * 100),
        category: 'Samling'
      },
      {
        id: 'reactor',
        emoji: '💬',
        title: 'Aktiv Läsare',
        description: 'Reagera på 50 berättelser',
        unlocked: stats.reactions_given >= 50,
        progress: Math.min(100, (stats.reactions_given / 50) * 100),
        category: 'Community'
      },
      {
        id: 'early_adopter',
        emoji: '🚀',
        title: 'Tidig Användare',
        description: 'Var med från början',
        unlocked: true,
        progress: 100,
        category: 'Special'
      },
    ];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const achievements = getAchievements();
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const categories = ['Alla', ...new Set(achievements.map(a => a.category))];

  const filteredAchievements = selectedCategory === 'Alla' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-surface border-b border-border">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-surface-variant rounded-full transition">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">{t('achievements.title')}</h1>
          <div className="w-9"></div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto">
        {/* Stats Header */}
        <div className="p-6 text-center bg-gradient-to-b from-primary/10 to-transparent">
          <div className="text-6xl mb-4">
            <Trophy className="w-16 h-16 mx-auto text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-2">{unlockedCount}/{achievements.length}</h2>
          <p className="text-text-secondary">Prestationer upplåsta</p>
          
          {/* Progress Bar */}
          <div className="mt-4 max-w-xs mx-auto">
            <div className="h-2 bg-surface-variant rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="px-6 py-4 border-b border-border overflow-x-auto">
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-surface border border-border hover:border-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`relative aspect-square rounded-2xl p-4 flex flex-col items-center justify-center text-center border-2 transition ${
                  achievement.unlocked
                    ? 'bg-surface border-primary shadow-lg shadow-primary/20'
                    : 'bg-surface-variant border-border opacity-60'
                }`}
              >
                {!achievement.unlocked && (
                  <div className="absolute top-2 right-2">
                    <Lock className="w-4 h-4 text-text-dim" />
                  </div>
                )}
                
                <div className="text-4xl mb-2">{achievement.emoji}</div>
                <h3 className="font-semibold text-sm mb-1">{achievement.title}</h3>
                <p className="text-xs text-text-dim mb-2">{achievement.description}</p>
                
                {!achievement.unlocked && achievement.progress > 0 && (
                  <div className="mt-auto w-full">
                    <div className="h-1 bg-background rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${achievement.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-text-dim mt-1">{Math.round(achievement.progress)}%</p>
                  </div>
                )}
                
                {achievement.unlocked && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="mx-6 mb-6 p-4 bg-surface rounded-xl border border-border">
          <h4 className="font-semibold mb-3">Din Statistik</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-text-dim">Berättelser lästa</p>
              <p className="font-bold text-lg">{stats?.stories_read || 0}</p>
            </div>
            <div>
              <p className="text-text-dim">Berättelser publicerade</p>
              <p className="font-bold text-lg">{stats?.stories_published || 0}</p>
            </div>
            <div>
              <p className="text-text-dim">Totala läsningar</p>
              <p className="font-bold text-lg">{stats?.total_reads || 0}</p>
            </div>
            <div>
              <p className="text-text-dim">Hjärtan mottagna</p>
              <p className="font-bold text-lg">{stats?.total_loves || 0}</p>
            </div>
          </div>
        </div>
      </main>

      <BottomNav activeTab="profile" />
    </div>
  );
}

export default withAuth(AchievementsPage);
