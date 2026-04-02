'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { storiesApi } from '@/lib/api';
import withAuth from '@/components/withAuth';
import BottomNav from '@/components/BottomNav';
import { Settings, Share2, Flame, BookOpen, Award, LogOut, Shield } from 'lucide-react';
import Link from 'next/link';

function ProfilePage() {
  const { user, logout, isAdmin } = useAuth();
  const [userStories, setUserStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserStories = async () => {
      try {
        const stories = await storiesApi.getMyStories();
        setUserStories(stories);
      } catch (error) {
        console.error('Error fetching user stories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStories();
  }, []);

  if (!user) return null;

  const achievements = [
    { emoji: '📚', label: 'Första berättelsen', unlocked: true },
    { emoji: '🔥', label: '7-dagars streak', unlocked: true },
    { emoji: '✍️', label: 'Publicerad', unlocked: true },
    { emoji: '💯', label: '100 läsningar', unlocked: true },
    { emoji: '🏆', label: '10 berättelser', unlocked: false },
    { emoji: '⭐', label: '30-dagars streak', unlocked: false },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-surface border-b border-border">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold">Profil</h1>
          <div className="flex items-center gap-2">
            {isAdmin && (
              <Link
                href="/admin"
                className="p-2 hover:bg-primary/10 rounded-full transition text-primary"
                title="Admin Panel"
              >
                <Shield className="w-5 h-5" />
              </Link>
            )}
            <Link
              href="/settings"
              className="p-2 hover:bg-surface-variant rounded-full transition"
            >
              <Settings className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="p-6 text-center">
          <img
            src={user.avatar_url || `https://picsum.photos/seed/${user.username}/200/200`}
            alt={user.username}
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary object-cover"
          />
          <div className="flex items-center justify-center gap-2 mb-1">
            <h2 className="text-2xl font-bold">@{user.username}</h2>
            {user.role === 'admin' && (
              <span className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
                ADMIN
              </span>
            )}
          </div>
          {user.bio && <p className="text-text-secondary text-sm mb-4">{user.bio}</p>}
          {user.email && <p className="text-text-dim text-xs mb-4">{user.email}</p>}

          <div className="flex justify-center gap-8 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold">847</div>
              <div className="text-xs text-text-dim">Följare</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">12</div>
              <div className="text-xs text-text-dim">Följer</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm mb-4">
            <Flame className="w-5 h-5 text-secondary" />
            <span className="font-semibold">12-dagars streak!</span>
          </div>

          <div className="flex gap-3">
            <Link href="/profile/edit" className="flex-1 btn-secondary text-center">
              Redigera Profil
            </Link>
            <button onClick={logout} className="btn-secondary flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Logga ut
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="border-t border-border p-6">
          <h3 className="text-lg font-semibold mb-4">📊 Lässtatistik</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="text-sm">Berättelser lästa</span>
              </div>
              <span className="font-semibold">15</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Flame className="w-5 h-5 text-secondary" />
                <span className="text-sm">Total lästid</span>
              </div>
              <span className="font-semibold">24h 12m</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-accent" />
                <span className="text-sm">Favoritgenre</span>
              </div>
              <span className="font-semibold">Thriller</span>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="border-t border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">🏆 Prestationer</h3>
            <span className="text-sm text-text-dim">4/20 upplåsta</span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-2 ${
                  achievement.unlocked
                    ? 'bg-surface border border-primary'
                    : 'bg-surface-variant opacity-50'
                }`}
              >
                <span className="text-3xl">{achievement.emoji}</span>
                <span className="text-xs text-center px-2">{achievement.label}</span>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 text-sm text-primary hover:underline">
            Visa alla prestationer →
          </button>
        </div>

        {/* My Stories */}
        <div className="border-t border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">✍️ Mina Berättelser</h3>
            {userStories.length > 0 && (
              <button className="text-sm text-primary hover:underline">
                Se alla →
              </button>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin w-6 h-6 border-4 border-primary border-t-transparent rounded-full" />
            </div>
          ) : (
            <div className="card space-y-4">
              {userStories.length > 0 ? (
                userStories.slice(0, 3).map((story) => (
                  <div key={story.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                    <Link href={`/story/${story.id}`}>
                      <h4 className="font-semibold mb-1 hover:text-primary transition">{story.title}</h4>
                    </Link>
                    <p className="text-sm text-text-secondary mb-2">
                      {story.episode_count} episoder • {story.status === 'ongoing' ? 'Pågående' : 'Avslutad'}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-text-dim">
                      <span>{story.reads || 0} läsningar</span>
                      <span>•</span>
                      <span>❤️ {story.love_count || 0}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-text-secondary py-4 text-center">
                  Du har inte skapat några berättelser än
                </p>
              )}

              <Link href="/create">
                <button className="w-full py-3 border-2 border-dashed border-border rounded-xl text-sm text-text-secondary hover:border-primary hover:text-primary transition">
                  + Skapa ny berättelse
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="border-t border-border p-6 space-y-2">
          <button className="w-full text-left py-3 px-4 hover:bg-surface rounded-lg transition">
            Inställningar
          </button>
          <button className="w-full text-left py-3 px-4 hover:bg-surface rounded-lg transition">
            Hjälp & Support
          </button>
        </div>
      </main>

      <BottomNav activeTab="profile" />
    </div>
  );
}

export default withAuth(ProfilePage);
