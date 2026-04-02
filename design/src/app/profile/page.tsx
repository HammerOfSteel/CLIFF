'use client';

import BottomNav from '@/components/BottomNav';
import { Settings, Share2, Flame, BookOpen, Award, Users } from 'lucide-react';
import Image from 'next/image';

export default function ProfilePage() {
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
          <button className="p-2 hover:bg-surface-variant rounded-full transition">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="p-6 text-center">
          <Image
            src="https://picsum.photos/seed/profile/200/200"
            alt="Profile"
            width={100}
            height={100}
            className="rounded-full mx-auto mb-4 border-4 border-primary"
          />
          <h2 className="text-2xl font-bold mb-1">@bokälskare_23</h2>
          <p className="text-text-secondary text-sm mb-4">Medlem sedan januari 2026</p>

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

          <div className="flex items-center justify-center gap-2 text-sm">
            <Flame className="w-5 h-5 text-secondary" />
            <span className="font-semibold">12-dagars streak!</span>
          </div>

          <button className="mt-4 w-full btn-secondary">Redigera Profil</button>
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
            <button className="text-sm text-primary hover:underline">
              Se alla →
            </button>
          </div>

          <div className="card space-y-4">
            <div className="border-b border-border pb-4">
              <h4 className="font-semibold mb-1">Mitt första verk</h4>
              <p className="text-sm text-text-secondary mb-2">2 episoder • Pågående</p>
              <div className="flex items-center gap-4 text-sm text-text-dim">
                <span>124 läsningar</span>
                <span>•</span>
                <span>❤️ 23</span>
              </div>
            </div>

            <button className="w-full py-3 border-2 border-dashed border-border rounded-xl text-sm text-text-secondary hover:border-primary hover:text-primary transition">
              + Skapa ny berättelse
            </button>
          </div>
        </div>

        {/* Settings */}
        <div className="border-t border-border p-6 space-y-2">
          <button className="w-full text-left py-3 px-4 hover:bg-surface rounded-lg transition">
            Inställningar
          </button>
          <button className="w-full text-left py-3 px-4 hover:bg-surface rounded-lg transition">
            Hjälp & Support
          </button>
          <button className="w-full text-left py-3 px-4 text-state-error hover:bg-surface rounded-lg transition">
            Logga ut
          </button>
        </div>
      </main>

      <BottomNav activeTab="profile" />
    </div>
  );
}
